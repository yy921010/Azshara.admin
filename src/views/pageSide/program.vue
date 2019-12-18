<template>
  <div class="app-container">
    <table-filter />
    <el-table
      :data="program.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="频道ID" prop="channelId" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="programName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.programName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop=",startTime" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="pictureUrl" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pictureUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.updateAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="program.total" @change="paginationChange" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getProgram } from '@api/program-service'

export default {
  name: 'Program',
  components: {
    Pagination,
    TableFilter
  },
  data() {
    return {
      program: {},
      detailVisible: false,
      detailStatus: ''
    }
  },
  async mounted() {
    // 通过api 中的函数，调用数据
    const data = await getProgram()
    this.program = data
  },
  methods: {
    paginationChange() {}
  }
}

</script>

<style scoped>

</style>
