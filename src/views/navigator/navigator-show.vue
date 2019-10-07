<template>
  <div class="app-container">
    <table-filter @onCreate="addNavigator" />
    <el-table
      :data="navigator.items"
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
      <el-table-column label="导航标题" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否子页面？" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isSub === 1">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
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
          <el-button type="primary" size="mini" @click="editNavigator(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deleteNavigator(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="navigator.total" @change="paginationChange" />
    <navigator-detail :is-show="detailVisible" :detail="navigatorDetail" @onDetail="onDetailShow" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import NavigatorDetail from './navigator-detail'
import { getNavigator, addNavigator, updateNavigator, deleteNavigator } from '@api/navigator-service'

export default {
  name: 'NavigatorShow',
  components: {
    Pagination,
    TableFilter,
    NavigatorDetail
  },
  data() {
    return {
      navigator: {},
      navigatorDetail: {},
      detailVisible: false,
      detailStatus: ''
    }
  },
  mounted() {
    this.getNavigator()
  },
  methods: {
    async getNavigator(pageNumber = 1) {
      const pageSize = 20
      this.navigator = await getNavigator({ pageSize, pageNumber })
    },
    _initDetail({ name, isSub }) {
      this.navigatorDetail = { name, isSub }
    },
    addNavigator() {
      this.detailVisible = true
      this.detailStatus = 'ADD'
      this._initDetail({})
    },
    async deleteNavigator({ id, name }) {
      this.$confirm(`是否删除${name}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteNavigator(id)
        await this.getNavigator()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }, () => {
      })
    },
    editNavigator({ id, name, isSub }) {
      this.detailStatus = 'EDIT'
      this.detailVisible = true
      this._initDetail({
        name,
        isSub,
        id
      })
    },
    async paginationChange(pageNumber) {
      this.getNavigator(pageNumber)
    },
    async onDetailShow({ action, detail }) {
      this.detailVisible = false
      let message = ''
      if (action === 'cancel') {
        this._initDetail({})
        this.detailStatus = ''
        return
      }
      switch (this.detailStatus) {
        case 'ADD':
          await addNavigator(detail)
          this.getNavigator()
          message = '新增成功'
          break
        case 'EDIT':
          delete detail.imageId
          await updateNavigator({ actor: detail }, detail.id)
          message = '更新成功'
      }
      this.$message({
        type: 'success',
        message
      })
    }
  }
}
</script>

<style scoped>

</style>
