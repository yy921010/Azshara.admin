<template>
  <div class="app-container">
    <table-filter @onCreate="addProgram" />
    <div class="cur-channel">当前频道: {{ channelName }}</div>
    <el-table
      :data="program"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="名称" prop="programName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.programName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="海报" prop="pictureUrl" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.pictureUrl" alt="" style="height: 40px;width: 71px">
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop=",startTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(new Date(+scope.row.startTime)).format('MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(new Date(+scope.row.endTime)).format('MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ typeStr[scope.row.type] }}</span>
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
          <el-button type="primary" size="mini" @click="editProgram(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="delProgram(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ProgramDetail
      :detail="programDetail"
      :is-show="detailVisible"
      :start-time-str="startTimeStr"
      @onDetail="onDetail"
    />
  </div>
</template>

<script>
import TableFilter from '@components/TableFilter'
import { getProgram, addProgram, updateProgram } from '@api/program-service'
import { getChannelByChannelName } from '@api/channel-service'
import ProgramDetail from './program-detail'
import { delProgramId } from '../../api/program-service'

export default {
  name: 'Program',
  components: {
    TableFilter,
    ProgramDetail
  },
  data() {
    return {
      program: [],
      detailVisible: false,
      detailStatus: '',
      channelName: '',
      programDetail: {},
      startTimeStr: '',
      channel: {},
      typeStr: ['电视剧', '电影', '综艺', '体育', '纪录片', '音乐', '新闻']
    }
  },
  async mounted() {
    // 通过api 中的函数，调用数据
    const channelName = this.$route.params.channelName
    this.channelName = channelName
    this.getProgramByChan(channelName)
  },
  methods: {
    async getProgramByChan(channelName) {
      const channel = await getChannelByChannelName(channelName)
      const data = await getProgram({
        channelId: channel.id
      })
      this.channel = channel
      this.program = data || {}
    },
    _initDetail({ programName, id, pictureUrl, startTime, endTime, description, type }) {
      this.programDetail = {
        programName,
        id,
        pictureUrl,
        startTime,
        endTime,
        description,
        type
      }
    },
    editProgram({ programName, id, pictureUrl, startTime, endTime, description, type }) {
      this.detailStatus = 'EDIT'
      this.detailVisible = true
      this._initDetail({
        programName,
        id,
        pictureUrl,
        startTime,
        endTime,
        description,
        type
      })
    },
    delProgram({ id, programName }) {
      this.$confirm(`是否删除${programName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delProgramId(id)
        await this.getProgramByChan(this.channelName)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
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
          detail.type = detail.type + ''
          detail.channelId = this.channel.id + ''
          detail.startTime = detail.startTime + ''
          detail.endTime = detail.endTime + ''
          await addProgram(detail)
          message = '新增成功'
          break
        case 'EDIT':
          detail.type = detail.type + ''
          detail.channelId = this.channel.id + ''
          detail.startTime = detail.startTime + ''
          detail.endTime = detail.endTime + ''
          await updateProgram(detail, detail.id)
          message = '更新成功'
      }
      await this.getProgramByChan(this.channelName)
      this.$message({
        type: 'success',
        message
      })
    },
    addProgram() {
      this._initDetail({})
      this.detailStatus = 'ADD'
      this.detailVisible = true
      const maxIndex = this.program.length - 1
      const lastProgram = this.program[maxIndex]
      this.startTimeStr = +lastProgram.endTime
    }
  }
}

</script>

<style scoped>
  .cur-channel{
    color: #2b2f3a;
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
</style>
