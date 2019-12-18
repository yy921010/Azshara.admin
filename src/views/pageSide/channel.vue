<template>
  <div class="app-container">
    <table-filter />
    <el-table
      :data="channel.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="频道名称" prop="channelName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="LOGO" prop="logo" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logo" alt="">
        </template>
      </el-table-column>
      <el-table-column label="播放地址" prop="playUrl" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.playUrl }}</span>
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
    <Pagination :total="channel.total" @change="paginationChange" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getChannel } from '@api/channel-service'

export default {
  name: 'Channel',
  components: {
    Pagination,
    TableFilter
  },
  data() {
    return {
      channel: {},
      detailVisible: false,
      detailStatus: ''
    }
  },
  async mounted() {
    // 通过api 中的函数，调用数据
    const data = await getChannel()
    this.channel = data
  },
  methods: {
    paginationChange() {}
  }
}
</script>

<style scoped>

</style>
