<template>
  <el-dialog title="用户" :visible.sync="isShow" center :show-close="false">
    <el-form action="" :model="detail">
      <el-form-item label="用户pin">
        <el-input v-model="detail.pin" />
      </el-form-item>
      <el-form-item label="角色分配">
        <el-select v-model="detail.role" placeholder="是否锁定">
          <el-option label="普通用户" value="normal" />
          <el-option label="管理员用户" value="admin" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否锁定">
        <el-select v-model="detail.accountNonLocked" placeholder="是否锁定">
          <el-option label="否" :value="1" />
          <el-option label="是" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="detail.accountNonExpired" placeholder="是否过期">
          <el-option label="否" :value="1" />
          <el-option label="是" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用">
        <el-select v-model="detail.enable" placeholder="是否可用">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否验证过期">
        <el-select v-model="detail.credentialsNonExpired" placeholder="是否锁定">
          <el-option label="否" :value="1" />
          <el-option label="是" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄级别">
        <el-select v-model="detail.ageLevel" placeholder="年龄级别">
          <el-option label="18" :value="18" />
          <el-option label="16" :value="16" />
          <el-option label="12" :value="12" />
          <el-option label="8" :value="8" />
          <el-option label="6" :value="6" />
          <el-option label="0" :value="0" />
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
  name: 'UserDetail',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => ({
        accountNonLocked: '',
        accountNonExpired: '',
        enable: 1,
        pin: '',
        credentialsNonExpired: '',
        ageLevel: ''
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
