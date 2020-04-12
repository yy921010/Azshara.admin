<template>
  <div class="app-container">
    <table-filter />
    <el-table
      :data="users.records"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="用户名" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="过期" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>
            <el-tag v-if="scope.row.accountNonExpired === 0" type="danger">是</el-tag>
            <el-tag v-else>否</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="锁定" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>
            <el-tag v-if="scope.row.accountNonLocked === 0" type="danger">是</el-tag>
            <el-tag v-else>否</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="为验证" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>
            <el-tag v-if="scope.row.credentialsNonExpired === 0" type="danger">是</el-tag>
            <el-tag v-else>否</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="是否可用" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span> <el-tag v-if="scope.row.enable ===1">是</el-tag> <el-tag v-else type="danger">禁</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="id" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="editUser(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deleteUser(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="users.total" @changePage="changePage" />
    <UserDetail :detail="userInfo" :is-show="visibleDialog" @onDetail="onUserDetail" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getUser, delUser,editUser } from '@api/user-service'
import UserDetail from './UserDetail'

export default {
  name: 'User',
  components: {
    Pagination,
    TableFilter,
    UserDetail
  },
  data() {
    return {
      users: {},
      detailVisible: false,
      detailStatus: '',
      visibleDialog: false,
      userInfo: {}
    }
  },
  async mounted() {
    this.getUserByPageNumber()
  },
  methods: {
    async getUserByPageNumber(pageNumber = 1) {
      const pageSize = 20
      this.users = await getUser(pageNumber, pageSize)
    },
    async deleteUser({ id, userId, userName }) {
      this.$confirm(`是否删除用户：${userName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delUser({ userId, id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getUserByPageNumber()
      })
    },
    changePage(pageNumber) {
      this.getUserByPageNumber(pageNumber)
    },
    editUser(userInfo) {
      this.visibleDialog = true
      this.userInfo = userInfo
    },
    onUserDetail({ action }) {
      this.visibleDialog = false
      editUser(this.userInfo)
    }
  }
}
</script>

<style scoped>

</style>
