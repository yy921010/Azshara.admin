<template>
  <el-dialog title="添加节目单" :visible.sync="isShow" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="detail">
      <el-form-item label="节目单海报">
        <Cropper :append-to-body="true" scope="program" :limit="1" @onCropper="handleCropper" />
      </el-form-item>
      <el-form-item label="节目单名称">
        <el-input v-model="detail.programName" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="节目单名称">
        <el-select v-model="detail.type" default-first-option placeholder="节目单类别">
          <el-option label="电视剧" :value="1" />
          <el-option label="电影" :value="2" />
          <el-option label="综艺" :value="3" />
          <el-option label="体育" :value="4" />
          <el-option label="纪录片" :value="5" />
          <el-option label="音乐" :value="6" />
          <el-option label="新闻" :value="7" />
        </el-select>
      </el-form-item>
      <el-form-item label="节目单描述">
        <el-input
          v-model="detail.description"
          type="textarea"
          placeholder="播放地址,以'｜' 作为分割"
          :autosize="{ minRows: 4, maxRows: 10}"
        />
      </el-form-item>
      <el-form-item label="节目单时间区间">
        <el-time-picker
          v-model="timeRange"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        /></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="default" @click="dialogAction('cancel')">取消</el-button>
      <el-button type="primary" @click="dialogAction('finish')">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Cropper from '@components/Cropper'
export default {
  name: 'ProgramDetail',
  components: {
    Cropper
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => ({
        programName: '',
        description: '',
        startTime: 0,
        endTime: 0,
        type: 1
      })
    },
    startTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timeRange: [new Date(), new Date()]
    }
  },
  methods: {
    dialogAction(action) {
      const startTime = this.timeRange[0]
      const endTime = this.timeRange[1]
      const startTimeNumber = startTime.getTime()
      const endTimeNumber = endTime.getTime()
      this.detail.startTime = startTimeNumber
      this.detail.endTime = endTimeNumber
      this.$emit('onDetail', {
        action,
        detail: this.detail
      })
    },
    handleCropper(images) {
      if (images && images.length > 0) {
        const image = images[0]
        this.detail.pictureUrl = image.url
      }
    }
  }
}
</script>

<style scoped>

</style>

