<template>
  <div class="app-container">
    <table-filter />
    <el-table
      :data="users.items"
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
      <el-table-column label="头像" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt="" style="height: 30px;width: 30px;">
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
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
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getUser, delUserByName } from '@api/user-service'
export default {
  name: 'User',
  components: {
    Pagination,
    TableFilter
  },
  data() {
    return {
      users: {},
      detailVisible: false,
      detailStatus: ''
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
    async deleteUser({ username }) {
      this.$confirm(`是否删除用户：${username}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delUserByName(username)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    changePage(pageNumber) {
      this.getUserByPageNumber(pageNumber)
    }
  }
}
</script>

<style scoped>

</style>
