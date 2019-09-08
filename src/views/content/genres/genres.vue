<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="primary" @click="addGenre">新增</el-button>
    </el-header>
    <el-main>
      <el-table
        :data="genre.items"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="id" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别名" prop="name" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdTime" align="center">
          <template slot-scope="scope">
            <span>{{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center">
          <template slot-scope="scope">
            <span>{{ $dayjs(scope.row.updateAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="editGenre(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="deleteGenre(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <Pagination :total="genre.total" @change="paginationChange" />
    </el-footer>
    <genre-detail :detail="genreDetail" :is-show="detailVisible" @onDetail="onDetail" />
  </el-container>
</template>

<script>
import Pagination from '@components/Pagination'
import { getGenre, addGenre, updateGenre, deleteGenre } from '@api/genre'
import GenreDetail from './genres-detail'
export default {
  name: 'Genres',
  components: {
    Pagination,
    GenreDetail
  },
  data() {
    return {
      genre: {},
      genreDetail: {
        name: ''
      },
      detailVisible: false,
      detailStatus: null
    }
  },
  mounted() {
    this.getGenre({})
  },
  methods: {
    _initGenres({ name, id }) {
      this.genreDetail.name = name
      this.genreDetail.id = id
    },
    async getGenre({ pageNumber = 1 }) {
      const pageSize = 20
      this.genre = await getGenre({ pageNumber, pageSize })
    },
    addGenre() {
      this.detailVisible = true
      this.detailStatus = 'ADD'
      this._initGenres({})
    },

    editGenre({ id, name }) {
      this.detailStatus = 'EDIT'
      this.detailVisible = true
      this._initGenres({ id, name })
    },

    deleteGenre({ id, name }) {
      this.$confirm(`是否删除${name}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteGenre(id)
        await this.getGenre({})
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    async onDetail({ action, detail }) {
      this.detailVisible = false
      let message = ''
      if (action === 'cancel') {
        this._initGenres({})
        this.detailStatus = null
        return
      }
      if (this.detailStatus === 'ADD') {
        await addGenre(detail)
        message = '新增成功'
      }
      if (this.detailStatus === 'EDIT') {
        await updateGenre(detail)
        message = '更新成功'
      }
      this.$message({
        type: 'success',
        message
      })
      await this.getGenre({})
    },
    paginationChange(num) {
      this.getGenre(num)
    }
  }
}
</script>

<style scoped>

</style>
