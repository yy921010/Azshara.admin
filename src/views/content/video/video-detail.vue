<template>
  <div class="video-detail-container">
    <el-form ref="postForm" :model="videoDetail" :rules="rules" class="form-container">
      <stickly :z-index="10" class="sub-navbar">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          提交
        </el-button>
        <el-button v-loading="loading" type="warning" @click="cancelForm">
          返回
        </el-button>
      </stickly>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <md-input v-model="videoDetail.contentName" :max-length="100" placeholder="请输入内容标题">内容标题</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="postInfo-container">
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="类别" class="postInfo-container-item">
                <el-select v-model="videoDetail.type" default-first-option placeholder="影片类别">
                  <el-option label="单品" :value="1" />
                  <el-option label="剧集" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="集数" class="postInfo-container-item">
                <el-input v-model="videoDetail.serialNumber" placeholder="集数" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="风格" class="postInfo-container-item">
                <el-select v-model="videoDetail.genre" filterable default-first-option placeholder="风格">
                  <el-option v-for="(item,index) in genres" :key="item+index" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="年龄级" class="postInfo-container-item">
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
              <el-form-item label-width="60px" label="国家" class="postInfo-container-item">
                <el-input v-model="videoDetail.country" placeholder="国家" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="时间" class="postInfo-container-item">
                <el-date-picker v-model="videoDetail.publish" type="datetime" format="yyyy-MM-dd" placeholder="选择一个时间" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="60px" label="语言" class="postInfo-container-item">
                <el-input v-model="videoDetail.language" type="datetime" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="60px" label="时长" class="postInfo-container-item">
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
            <el-col :span="12">
              <el-form-item label-width="60px" label="演员:" class="postInfo-container-item">
                <el-select
                  v-model="videoDetail.author"
                  :remote-method="getActorByName"
                  filterable
                  default-first-option
                  remote
                  placeholder="输入人员"
                >
                  <el-option v-for="(item,index) in actors" :key="item+index" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <md-input v-model="videoDetail.title" :max-length="100" placeholder="影片标题"> 影片标题</md-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <md-input v-model="videoDetail.subtitle" :max-length="100" placeholder="副标题"> 副标题</md-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="content" style="margin-bottom: 30px;">
            <el-button>添加媒资</el-button>
          </el-form-item>
          <el-form-item prop="content" style="margin-bottom: 30px;">
            <Tinymce ref="editor" v-model="videoDetail.content" :height="400" />
          </el-form-item>

          <el-form-item prop="image_uri" style="margin-bottom: 30px;">
            <Cropper :append-to-body="false" @onCropper="onCropper" :limit="50"/>
          </el-form-item>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import stickly from '@components/Stickly'
import mdInput from '@components/MDinput'
import Tinymce from '@components/Tinymce'
import Cropper from '@components/Cropper'

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
      videoDetail: {
        contentName: ''
      },
      rules: {},
      loading: false,
      genres: [],
      actors: []
    }
  },
  computed: {
    ratingsRender() {
      return []
    },
    contentTypeRender() {
      return []
    }
  },
  methods: {
    submitForm() {
    },
    cancelForm() {
    },
    getGenre() {

    },
    getActorByName() {

    },
    onCropper() {}
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
