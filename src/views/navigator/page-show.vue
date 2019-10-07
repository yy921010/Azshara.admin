<template>
  <div class="app-container">
    <table-filter @onCreate="addPageInfo" />
    <el-table
      :data="pages.items"
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
      <el-table-column label="页面名称" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.pageShape === 1">显示</el-tag>
          <el-tag v-else type="danger">隐藏</el-tag>
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
          <el-button type="primary" size="mini" @click="editPage(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deletePage(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="pages.total" @changePage="changePage" />
    <page-detail :is-show="detailVisible" :detail="pageDetail" @onDetail="onDetailShow" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import pageDetail from './page-detail'
import { getPage, updatePage, deletePage, addPage } from '@api/page-service'
export default {
  name: 'PageShow',
  components: {
    Pagination,
    TableFilter,
    pageDetail
  },
  data() {
    return {
      pages: {},
      pageDetail: {},
      detailVisible: false,
      detailStatus: ''
    }
  },
  mounted() {
    this.getPageByPageNumber()
  },
  methods: {
    async getPageByPageNumber(pageNumber = 1) {
      const pageSize = 20
      this.pages = await getPage({ pageSize, pageNumber })
    },
    addPageInfo() {

    },
    changePage(pageNumber) {
      this.getPageByPageNumber(pageNumber)
    },
    editPage() {

    },
    onDetailShow() {

    },
    deletePage({ id, pageName }) {
      this.$confirm(`是否删除${pageName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deletePage(id)
        await this.getPageByPageNumber()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }, () => {
      })
    }

  }
}
</script>

<style scoped>

</style>
