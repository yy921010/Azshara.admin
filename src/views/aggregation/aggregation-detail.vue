<template>
  <div class="aggregation-detail-container">
    <el-form ref="videoDetail" :model="aggregationDetail" :rules="detailRules" class="form-container">
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
              <md-input v-model="aggregationDetail.floorName" :max-length="100" placeholder="请输入楼层标题">楼层标题</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="title">
              <md-input v-model="aggregationDetail.titleUpLeftName" :max-length="100" placeholder="楼层左上角标题">楼层左上角标题</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="postInfo-container">
          <el-row>
            <el-col :span="12">
              <el-form-item label="关联页面?" class="postInfo-container-item" prop="type">
                <el-select v-model="aggregationDetail.haveRelatePage" default-first-option placeholder="请选择关联页面">
                  <el-option label="关联" :value="1" />
                  <el-option label="不关联" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="页面id" class="postInfo-container-item">
                <el-input v-model="aggregationDetail.relatePageId" placeholder="页面id" :disabled="aggregationDetail.haveRelatePage ===2" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="页面样式" class="postInfo-container-item" prop="type">
                <el-select v-model="aggregationDetail.floorStyle" default-first-option placeholder="页面样式">
                  <el-option label="竖直滑动" :value="1" />
                  <el-option label="横向滑动" :value="2" />
                  <el-option label="带有背景竖直滑动" :value="3" />
                  <el-option label="带有背景横向滑动" :value="4" />
                  <el-option label="两栏显示" :value="5" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import stickly from '@components/Stickly'
import mdInput from '@components/MDinput'
export default {
  name: 'AggregationDetail',
  components: {
    stickly,
    mdInput
  },
  data() {
    return {
      loading: false,
      aggregationDetail: {
        floorName: '',
        titleUpLeftName: '',
        haveRelatePage: 1,
        relatePageId: '',
        floorStyle: 1
      },
      detailRules: {}
    }
  },
  methods: {
    submitForm() {},
    cancelForm() {}
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/mixin.scss";

  .el-form-item__label {
    text-align: left;
  }

  .aggregation-detail-container {
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
