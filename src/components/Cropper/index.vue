<template>
  <div class="cropper">
    <el-dialog :visible.sync="cropperVisible" :append-to-body="appendToBody" title="图片裁剪">
      <el-form>
        <el-form-item label="图片预览">
          <vueCropper
            ref="cropper"
            style="height: 300px"
            :img="url"
            :output-size="option.size"
            :output-type="outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :fixed="option.fixed"
            :fixed-number="fixedNumber"
            :center-box="option.centerBox"
            :info-true="option.infoTrue"
            :fixed-box="option.fixedBox"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="pictureType" value @change="changeImageSize">
            <el-option label="头像" :value="1" />
            <el-option label="横向海报" :value="2" />
            <el-option label="竖直海报" :value="3" />
            <el-option label="宣传海报" :value="4" />
            <el-option label="自定义" :value="5" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="dialogAction('cancel')">取消</el-button>
        <el-button type="primary" @click="dialogAction('finish')">确认</el-button>
      </span>
    </el-dialog>
    <el-upload
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :limit="limit"
      :on-change="changeUpload"
      :before-upload="beforeUpload"
      accept="image/jpeg,image/gif,image/png"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">点击上传</div>
      <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
    </el-upload>
    <div class="poster__preview">
      <ul class="previews">
        <li v-for="(item,index) in previewPictures" :key="index" class="preview-item">
          <preview-image :id="item.id" :name="item.name" :src="item.path" @onImage="removeUpload" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { setFormDate } from '@/utils'
import previewImage from './PreviewImage'
import { deleteImage, addImage } from '@api/image-service'
import { mapState, mapMutations } from 'vuex'

const imageFixedMap = {
  '1': [1, 1],
  '2': [16, 9],
  '3': [3, 5],
  '4': [21, 9],
  '5': false
}

export default {
  name: 'Index',
  components: {
    previewImage
  },
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: 'png'
    },
    scope: {
      type: String,
      default: 'actors'
    }
  },
  data: () => ({
    cropperVisible: false,
    fileInfo: null,
    fixedNumber: [1, 1],
    pictureType: 1,
    url: '',
    option: {
      info: true, // 裁剪框的大小信息
      outputSize: 0.8, // 裁剪生成图片的质量
      canScale: false, // 图片是否允许滚轮缩放
      autoCrop: true, // 是否默认生成截图框
      fixedBox: false, // 固定截图框大小 不允许改变
      fixed: true, // 是否开启截图框宽高固定比例
      full: true, // 是否输出原图比例的截图
      canMoveBox: true, // 截图框能否拖动
      original: false, // 上传图片按照原始比例渲染
      centerBox: true, // 截图框是否被限制在图片里面
      infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    }
  }),
  computed: {
    ...mapState('image', {
      previewPictures: s => s.previewPictures
    })
  },
  mounted() {
    this.clearPictures()
  },
  methods: {
    ...mapMutations('image', {
      'addPictureArrs': 'ADD_PICTURE_ARR',
      'deletePictureById': 'DELETE_PICTURE_BY_ID',
      'clearPictures': 'CLEAR_PICTURE'
    }),

    getCropBlob(fn) {
      return this.$refs.cropper.getCropBlob(fn)
    },

    dialogAction(actionStr) {
      this.cropperVisible = false
      if (actionStr === 'cancel') {
        this.url = ''
        this.fileInfo = ''
        return
      }
      this.beginUploadImage()
      // 后续通知底层进行图片添加
    },
    /**
     * 开始文件上传
     */
    beginUploadImage() {
      this.$refs.cropper.getCropBlob(async data => {
        const optionDate = setFormDate({
          filename: 'image',
          file: data,
          data: {
            scope: this.scope,
            fixed: this.fixedNumber.join('X'),
            type: this.pictureType
          }
        })
        const resp = await addImage(optionDate)
        this.addPictureArrs({
          name: `${resp.fileName}`,
          id: resp.imageId,
          path: resp.path
        })
        this.$emit('onCropper', resp.imageId)
      })
    },

    changeImageSize() {
      const flexedNumber = this.pictureType + ''
      if (imageFixedMap[flexedNumber]) {
        this.option.fixed = true
        this.fixedNumber = imageFixedMap[flexedNumber]
      } else {
        this.option.fixed = false
      }
      this.$refs.cropper.refresh()
    },

    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
      }
      return isLt5M
    },


    changeUpload(file) {
      const _this = this
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        // 将图片base64的数据传递给vueCropper组件
        _this.url = this.result
        _this.cropperVisible = true
      }
      this.fileInfo = file
    },
    /**
     *
     * @param id actorId
     * @returns {Promise<void>}
     */
    async removeUpload(id) {
      this.deletePictureById(id)
      await deleteImage(id)
    }
  }
}
</script>

<style scoped lang="scss">
  .previews{
    list-style: none;
    padding: 0;
    display: flex;
    .preview-item{
        margin-right: 15px;
    }
  }
</style>
