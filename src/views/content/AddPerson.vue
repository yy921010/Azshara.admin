<template>
  <el-dialog title="添加参演人员" :visible.sync="personAddDialog" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="personDetail">
      <el-form-item label="添加头像">
        <Cropper :append-to-body="true" />
      </el-form-item>
      <el-form-item label="人员名字">
        <el-input v-model="personDetail.name" placeholder="影片地址" />
      </el-form-item>
      <el-form-item label="人员身份">
        <el-select v-model="personDetail.type" placeholder="人员身份">
          <el-option label="导演" :value="1" />
          <el-option label="演员" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="人员介绍">
        <el-input
          v-model="personDetail.introduce"
          type="textarea"
          placeholder="影片地址"
          :autosize="{ minRows: 4, maxRows: 6}"
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
  components: {
    Cropper
  },
  props: {
    personAddDialog: {
      type: Boolean,
      default: false
    },
    personDetail: {
      type: Object,
      default: () => ({
        name: '',
        type: 1,
        introduce: ''
      })
    }
  },
  data() {
    return {
      visibleDialog: false
    }
  },
  methods: {
    dialogAction(actionStr) {
      this.$emit('onDialogAction', {
        actionStr,
        personDetail: this.personDetail
      })
    }
  }
}
</script>
