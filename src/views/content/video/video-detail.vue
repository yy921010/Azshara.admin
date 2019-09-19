<template>
  <div class="video-detail-container">
    <el-form ref="videoDetail" :model="videoDetail" :rules="detailRules" class="form-container">
      <stickly :z-index="10" class="sub-navbar">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('videoDetail')">
          提交
        </el-button>
        <el-button v-loading="loading" type="warning" @click="cancelForm">
          返回
        </el-button>
      </stickly>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="contentName">
              <md-input v-model="videoDetail.contentName" :max-length="100" placeholder="请输入内容标题">内容标题</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="title">
              <md-input v-model="videoDetail.title" :max-length="100" placeholder="影片标题"> 影片标题</md-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="subTitle">
              <md-input v-model="videoDetail.subTitle" :max-length="100" placeholder="副标题"> 副标题</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="postInfo-container">
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="类别" class="postInfo-container-item" prop="type">
                <el-select v-model="videoDetail.type" default-first-option placeholder="影片类别">
                  <el-option label="单品" :value="1" />
                  <el-option label="剧集" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="集数" class="postInfo-container-item">
                <el-input v-model="videoDetail.serialNumber" placeholder="集数" :disabled="videoDetail.type ===1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="风格" class="postInfo-container-item" prop="genre">
                <el-select v-model="videoDetail.genre" default-first-option placeholder="风格">
                  <el-option v-for="(item,index) in genres" :key="index" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="年龄级" class="postInfo-container-item" prop="rating">
                <el-select v-model="videoDetail.rating" default-first-option placeholder="年龄级">
                  <el-option
                    v-for="(rating,index) in ratingsRender"
                    :key="index"
                    :label="rating.label"
                    :value="rating.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="国家" class="postInfo-container-item" prop="country">
                <el-input v-model="videoDetail.country" placeholder="国家" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="时间" class="postInfo-container-item">
                <el-date-picker v-model="videoDetail.publishDate" type="datetime" format="yyyy-MM-dd" placeholder="选择一个时间" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="语言" class="postInfo-container-item" prop="language">
                <el-input v-model="videoDetail.language" type="datetime" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="时长" class="postInfo-container-item" prop="duration">
                <el-input-number v-model="videoDetail.duration" placeholder="时长" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="内容类型" prop="contentType">
                <el-select v-model="videoDetail.contentType" placeholder="影片内容类型" value>
                  <el-option
                    v-for="(contentType,index) in contentTypeRender"
                    :key="index"
                    :label="contentType.label"
                    :value="contentType.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="演员:" class="postInfo-container-item">
                <el-select
                  v-model="videoDetail.actors"
                  :remote-method="getActorByName"
                  filterable
                  multiple
                  default-first-option
                  remote
                  placeholder="输入人员"
                >
                  <el-option v-for="(item,index) in actors" :key="index" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="导演:" class="postInfo-container-item">
                <el-select
                  v-model="videoDetail.director"
                  :remote-method="getDirectorByName"
                  filterable
                  multiple
                  default-first-option
                  remote
                  placeholder="输入人员"
                >
                  <el-option v-for="(item,index) in director" :key="index" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="content" style="margin-bottom: 30px;">
            <el-button size="mini" type="success" @click="showDefinitionDialog('add')">添加媒资</el-button>
            <el-table
              :data="videoDetail.definitions"
              border
              fit
              highlight-current-row
              style="width: 100%"
            >
              <el-table-column label="清晰度" prop="type" align="center">
                <template slot-scope="scope">
                  <span>{{ getDefinitionStr(scope.row.type) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="地址" prop="url" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.url }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button
                    v-if="row.status!='deleted'"
                    size="mini"
                    type="danger"
                    @click="deleteDefinition(row,'deleted')"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item prop="content" style="margin-bottom: 30px;">
            <Tinymce ref="editor" v-model="videoDetail.introduce" :height="400" />
          </el-form-item>

          <el-form-item prop="image_uri" style="margin-bottom: 30px;">
            <Cropper :append-to-body="false" :limit="50" :show-file-list="false" @onCropper="onCropper" />
          </el-form-item>

        </div>
      </div>
    </el-form>
    <el-dialog
      title="媒资编辑"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="清晰度">
          <el-select v-model="definition.type">
            <el-option label="预告" :value="1" />
            <el-option label="标清" :value="2" />
            <el-option label="高清" :value="3" />
            <el-option label="蓝光" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="definition.url" type="text" class="input-with-select" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="definitionDialogAction('cancel')">取 消</el-button>
        <el-button type="primary" @click="definitionDialogAction('confirm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import stickly from '@components/Stickly'
import mdInput from '@components/MDinput'
import Tinymce from '@components/Tinymce'
import Cropper from '@components/Cropper'
import { getGenre } from '@api/genre-service'
import { getActor } from '@api/actor-service'
import { addVideo } from '@api/video-service'
import { addDefinition, deleteDefinition } from '@api/definition-service'
import { mapState } from 'vuex'

export default {
  name: 'VideoDetail',
  components: {
    stickly,
    mdInput,
    Tinymce,
    Cropper
  },
  data() {
    return {
      dialogVisible: false,
      definition: {
        type: 1,
        url: ''
      },
      detailRules: {
        contentName: [{ required: true, message: '请输入内容名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入影片名称', trigger: 'blur' }],
        subTitle: [{ required: true, message: '请输入影片副名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入影片类别', trigger: 'blur' }],
        genre: [{ required: true, message: '请输入影片风格', trigger: 'blur' }],
        rating: [{ required: true, message: '请输入影片年龄级', trigger: 'blur' }],
        country: [{ required: true, message: '请输入影片国家', trigger: 'blur' }],
        language: [{ required: true, message: '请输入影片语言', trigger: 'blur' }],
        duration: [{ required: true, message: '请输入影片时长', trigger: 'blur' }],
        contentType: [{ required: true, message: '请输入影片内容类型', trigger: 'blur' }]
      },
      videoDetail: {
        contentName: '',
        actors: [],
        title: '',
        subTitle: '',
        director: [],
        definitions: [],
        introduce: '',
        pictures: [],
        language: '',
        publishDate: '',
        country: '',
        rating: '',
        genre: '',
        serialNumber: '',
        type: ''
      },
      loading: false,
      genres: [],
      actors: [],
      director: []
    }
  },
  computed: {
    ...mapState('image', {
      previewPictures: s => s.previewPictures
    }),
    ratingsRender() {
      return [
        {
          label: '普遍级',
          value: '0+'
        },
        {
          label: '保护级',
          value: '6+'
        },
        {
          label: '辅导十二岁级',
          value: '12+'
        },
        {
          label: '辅导十五岁级',
          value: '15+'
        },
        {
          label: '限制级',
          value: '18+'
        }
      ]
    },
    contentTypeRender() {
      return [
        {
          label: '电影',
          value: 1
        },
        {
          label: '剧集',
          value: 2
        },
        {
          label: '动漫',
          value: 3
        },
        {
          label: '综艺',
          value: 4
        },
        {
          label: '短视频',
          value: 5
        }
      ]
    }
  },
  async mounted() {
    const pageSize = 20
    const pageNumber = 1
    const { items } = await getGenre({
      pageSize,
      pageNumber
    })
    this.genres = items
  },
  methods: {
    getDefinitionStr(key) {
      const definitionMap = {
        1: '预告',
        2: '标清',
        3: '高清',
        4: '蓝光'
      }
      return definitionMap[key]
    },
    deleteDefinition({ id, type }) {
      this.$confirm(`是否删除${this.getDefinitionStr(type)}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteDefinition(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.videoDetail.definitions = this.videoDetail.definitions.filter(item => item.id !== id)
      })
    },
    _dealWithDetail() {
      let { actors, director, serialNumber } = this.videoDetail
      const {
        definitions, contentName, duration, subTitle, title, language,
        publishDate,
        country,
        rating,
        genre,
        type,
        introduce,
        contentType
      } = this.videoDetail
      if (!serialNumber) {
        serialNumber = 0
      }
      if (actors && actors.length > 0) {
        actors = actors.map(actor => ({
          id: actor,
          type: 2
        }))
      }
      if (director && director.length > 0) {
        director = director.map(item => ({
          id: item,
          type: 1
        }))
      }
      const finalActors = [...actors, ...director]
      const pictureIds = this.previewPictures.map(item => item.id)
      const definitionsIds = definitions.map(item => item.id)
      return {
        actors: JSON.stringify(finalActors),
        definitionIds: this._toString(definitionsIds),
        pictureIds: this._toString(pictureIds),
        content: JSON.stringify({
          contentName,
          duration,
          subTitle,
          title,
          language,
          publishDate,
          country,
          rating,
          serialNumber,
          type,
          introduce,
          contentType
        }),
        genreId: genre
      }
    },

    _toString(toMakeArrays) {
      if (toMakeArrays && toMakeArrays.length > 0) {
        return toMakeArrays.toString()
      }
      return ''
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const detailVideo = this._dealWithDetail()
          await addVideo(detailVideo)
          await this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.$router.push({
            name: 'contentIndex'
          })
        }
      })
    },
    cancelForm() {
      this.$router.push({
        name: 'contentIndex'
      })
    },
    async getActorByName(name) {
      if (!name) {
        return
      }
      const { items } = await getActor({
        name
      })
      this.actors = items
    },

    async getDirectorByName(name) {
      if (!name) {
        return
      }
      const { items } = await getActor({
        name
      })
      this.director = items
    },


    async definitionDialogAction(actionStr) {
      this.dialogVisible = false
      if (actionStr === 'cancel') {
        this.definition = {
          type: 1,
          url: ''
        }
        return
      }
      if (actionStr === 'confirm') {
        const { topicId } = await addDefinition({
          type: this.definition.type,
          url: this.definition.url
        })
        this.videoDetail.definitions.push({
          id: topicId,
          type: this.definition.type,
          url: this.definition.url
        })
      }
    },
    showDefinitionDialog(actionStr) {
      this.dialogVisible = true
      if (actionStr === 'add') {

      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/mixin.scss";

  .el-form-item__label {
    text-align: left;
  }

  .video-detail-container {
    position: relative;

    .form-container {
      .sub-navbar {
        height: 50px;
        line-height: 50px;
        position: relative;
        width: 100%;
        text-align: right;
        padding-right: 20px;
        -webkit-transition: 600ms ease position;
        transition: 600ms ease position;
        background: -webkit-gradient(linear, left top, right top, from(#20b6f9), color-stop(0%, #20b6f9), color-stop(100%, #2178f1), to(#2178f1));
        background: linear-gradient(90deg, #20b6f9 0%, #20b6f9 0%, #2178f1 100%, #2178f1 100%);
      }
    }

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }
  }
</style>
