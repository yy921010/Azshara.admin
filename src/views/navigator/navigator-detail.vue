<template>
  <el-dialog title="添加导航" :visible.sync="isShow" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="detail">
      <el-form-item label="导航标题">
        <el-input v-model="detail.name" placeholder="导航标题" />
      </el-form-item>
      <el-form-item label="是否显示？">
        <el-select v-model="detail.visible">
          <el-option :value="1" :label="'显示'" />
          <el-option :value="2" :label="'隐藏'" />
        </el-select>
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
  name: 'NavigatorDetail',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => ({
        name: '',
        visible: 1
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
    }
  }
}
</script>

<style scoped>

</style>
