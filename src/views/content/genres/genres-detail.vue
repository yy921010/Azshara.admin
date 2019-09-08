<template>
  <el-dialog title="添加影片类别" :visible.sync="isShow" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="detail">
      <el-form-item label="类别名称">
        <el-input v-model="detail.name" placeholder="影片类别" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="default" @click="dialogAction('cancel')">取消</el-button>
      <el-button type="primary" @click="dialogAction('finish')">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'GenresDetail',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => ({
        name: ''
      })
    }
  },
  methods: {
    dialogAction(action) {
      this.$emit('onDetail', {
        action,
        detail: this.detail
      })
    }
  }
}
</script>

<style scoped>

</style>
