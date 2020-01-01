<template>
  <el-dialog title="添加频道" :visible.sync="isShow" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="detail">
      <el-form-item label="频道logo">
        <Cropper :append-to-body="true" scope="chanLogo" :limit="1" @onCropper="handleCropper" />
      </el-form-item>
      <el-form-item label="频道名称">
        <el-input v-model="detail.channelName" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="播放地址">
        <el-input
          v-model="detail.playUrl"
          type="textarea"
          placeholder="播放地址,以'｜' 作为分割"
          :autosize="{ minRows: 4, maxRows: 10}"
        />
      </el-form-item>
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
  name: 'ChannelDetail',
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
        channelName: '',
        playUrl: ''
      })
    }
  },
  data() {
    return {
    }
  },
  methods: {
    dialogAction(action) {
      this.$emit('onDetail', {
        action,
        detail: this.detail
      })
    },
    handleCropper(images) {
      if (images && images.length > 0) {
        const image = images[0]
        this.detail.logo = image.url
      }
    }
  }
}
</script>

<style scoped>

</style>
