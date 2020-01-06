<template>
  <div class="app-container">
    <table-filter @onCreate="addChannel" />
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
          <img :src="scope.row.logo" alt="" style="max-width: 70px;height: 35px">
        </template>
      </el-table-column>
      <el-table-column label="播放地址" prop="playUrl" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.playUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="editChannel(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="delChannel(row,'deleted')"
          >
            删除
          </el-button>
          <el-button type="info" size="mini" @click="enterProgram(row)">
            节目单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="channel.total" @change="paginationChange" />
    <channelDetail :detail="channelDetail" :is-show="detailVisible" @onDetail="onDetail" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getChannel, addChannel, updateChannel, delChannel } from '@api/channel-service'
import channelDetail from './channel-detail'

export default {
  name: 'Channel',
  components: {
    Pagination,
    TableFilter,
    channelDetail
  },
  data() {
    return {
      channel: {

      },
      channelDetail: {
        channelName: '',
        playUrl: '',
        logo: ''
      },
      detailVisible: false,
      detailStatus: '',
      currentPageNumber: 1
    }
  },
  async mounted() {
    this.getChannel({
      pageSize: 20,
      pageNumber: 1
    })
  },
  methods: {

    async getChannel({ pageSize, pageNumber }) {
      const data = await getChannel({ pageSize, pageNumber })
      this.channel = data
    },

    _initDetail({ channelName, id, logo, playUrl }) {
      this.channelDetail.channelName = channelName
      this.channelDetail.id = id
      this.channelDetail.logo = logo
      this.channelDetail.playUrl = playUrl
    },

    enterProgram({ channelName }) {
      this.$router.push({
        name: 'programModule',
        params: {
          channelName
        }
      })
    },

    async paginationChange(pageNumber) {
      this.currentPageNumber = pageNumber
      this.refreshPageByCurPageNumber()
    },

    async refreshPageByCurPageNumber() {
      const pageSize = 20
      const pageNumber = this.currentPageNumber
      this.channel = await getChannel({ pageNumber, pageSize })
    },

    delChannel({ channelName }) {
      this.$confirm(`是否删除${channelName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delChannel(channelName)
        await this.getChannel({})
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },

    editChannel({ channelName, playUrl, logo, id }) {
      this.detailStatus = 'EDIT'
      this.detailVisible = true
      this._initDetail({
        channelName,
        playUrl,
        id,
        logo
      })
    },

    addChannel() {
      this.detailVisible = true
      this.detailStatus = 'ADD'
      this._initDetail({})
    },

    async onDetail({ action, detail }) {
      this.detailVisible = false
      if (action === 'cancel') {
        this._initDetail({})
        this.detailStatus = ''
        return
      }
      let message = null
      switch (this.detailStatus) {
        case 'ADD':
          await addChannel(detail)
          message = '新增成功'
          break
        case 'EDIT':
          await updateChannel(detail, detail.id)
          message = '更新成功'
      }
      await this.refreshPageByCurPageNumber()
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
