<template>
  <el-dialog title="添加参演人员" :visible.sync="isShow" center :close-on-click-modal="false" :show-close="false">
    <el-form :model="detail">
      <el-form-item label="人物海报">
        <Cropper :append-to-body="true" @onCropper="onCropper" />
      </el-form-item>
      <el-form-item label="人员名字">
        <el-input v-model="detail.name" placeholder="人员名字" />
      </el-form-item>
      <el-form-item label="人员介绍">
        <el-input
          v-model="detail.introduce"
          type="textarea"
          placeholder="人员介绍"
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'ActorDetail',
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
        name: '',
        introduce: ''
      })
    }
  },
  data() {
    return {
      pictureId: null
    }
  },
  computed: {
    ...mapState('image', {
      previewPictures: s => s.previewPictures
    })
  },
  methods: {
    ...mapMutations('image', {
      'clearViewPicture': 'CLEAR_PICTURE'
    }),
    ...mapActions('image', {
      deletePicture: 'deletePicture'
    }),
    dialogAction(action) {
      if (action === 'cancel') {
        this.pictureId = null
        if (this.previewPictures.length === 1) {
          const picture = this.previewPictures[0]
          picture.name === 'editPictureName' ? '' : this.deletePicture(picture.id)
        }
      }
      this.$emit('onDetail', {
        action,
        detail: this.detail,
        pictureId: this.pictureId
      })
      this.clearViewPicture()
    },

    onCropper(id) {
      this.pictureId = id
    }
  }
}
</script>

<style scoped>

</style>
