<template>
  <el-container>
    <el-header />
    <el-main>
      <el-form ref="form" :model="contentInfo" label-width="140px">
        <el-form-item label="内容名称">
          <el-input v-model="contentInfo.name" placeholder="请输入内容名称" :width="200" />
        </el-form-item>
        <el-form-item label="影片类型">
          <el-select v-model="contentInfo.type" placeholder="影片类型" value="">
            <el-option label="单品" :value="1" />
            <el-option label="剧集" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="contentInfo.type === 2" label="子集序号">
          <el-input v-model="contentInfo.serialNumber" placeholder="子集序号" />
        </el-form-item>
        <el-form-item label="内容类型">
          <el-select v-model="contentInfo.contentType" placeholder="影片内容类型" value="">
            <el-option
              v-for="(contentType,index) in contentTypeRender"
              :key="index"
              :label="contentType.label"
              :value="contentType.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容流派">
          <el-select
            v-model="contentInfo.genres"
            multiple
            placeholder="影片内容类型"
            value=""
          >
            <el-option v-for="(genre,index) in genres" :key="index" :label="genre" :value="genre" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容评级">
          <el-select v-model="contentInfo.rating" placeholder="内容评级" value="">
            <el-option v-for="(rating,index) in ratingsRender" :key="index" :label="rating.label" :value="rating.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="人员">
          <el-select
            v-model="contentInfo.actors"
            multiple
            filterable
            reserve-keyword
            :remote-method="getPersons"
            placeholder="请输入人员"
            value=""
          >
            <el-option v-for="(item,index) in persons" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <el-button type="info" @click="">添加</el-button>
        </el-form-item>
        <el-form-item label="内容标题">
          <el-input v-model="contentInfo.title" placeholder="请输入内容标题" />
        </el-form-item>
        <el-form-item label="内容副标题">
          <el-input v-model="contentInfo.subtitle" placeholder="请输入内容副标题" />
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label="内容简介">
          <el-input
            v-model="contentInfo.introduce"
            :rows="1"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            class="article-textarea"
            placeholder="请输入内容描述"
          />
        </el-form-item>
        <el-form-item label="是否短视频">
          <el-switch v-model="contentInfo.isShortVideo" />
        </el-form-item>
        <el-form-item label="添加媒资">
          <el-button type="primary" size="mini" @click="openDialogForDefinition">添加</el-button>
          <el-table :data="prepareDefinitions">
            <el-table-column label="清晰度" prop="id" sortable="custom" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="播放地址" prop="id" sortable="custom" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="definitionHandle(row)">
                  编辑
                </el-button>
                <el-button
                  v-if="row.status!='deleted'"
                  size="mini"
                  type="danger"
                  @click="definitionHandle(row,'deleted')"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="添加图片">
          <cropper />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加媒资" :visible.sync="definitionVisible" center>
        <el-form :model="definitionInfo">
          <el-form-item label="清晰度">
            <el-select v-model="definitionInfo.type" placeholder="影片类型">
              <el-option label="TS" :value="1" />
              <el-option label="SD" :value="2" />
              <el-option label="HD" :value="3" />
              <el-option label="UHD" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="视频播放地址">
            <el-input v-model="definitionInfo.url" placeholder="影片地址" />
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="definitionDialogHandle('cancel')">取消</el-button>
            <el-button type="primary" @click="definitionDialogHandle">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
    <el-footer />
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import cropper from '@components/Cropper'
export default {
  name: 'AddContent',
  components: {
    cropper
  },
  data() {
    return {
      definitionVisible: false,
      prepareDefinitions: [],
      definitionInfo: {
        type: 1,
        url: ''
      },
      contentInfo: {
        contentName: '',
        type: '',
        contentType: '',
        rating: '',
        title: '',
        subtitle: '',
        introduce: '',
        isShortVideo: false,
        genres: [],
        actors: []
      }
    }
  },
  computed: {
    ...mapState('content', {
      contentTypeRender: 'contentTypeRender',
      ratingsRender: 'ratingsRender',
      genres: 'genres'
    })
  },
  methods: {
    getPersons() {},
    openDialogForDefinition() {
      this.definitionVisible = true
    },
    definitionDialogHandle(actionStr) {
      if (actionStr === 'cancel') {
        this.definitionVisible = false
        return
      }
      this.prepareDefinitions = this.prepareDefinitions.push({
        type: this.definitionInfo.type,
        url: this.definitionInfo.url
      })
      this.definitionVisible = false
    },
    definitionHandle(rowItem, actionStr) {
      if (actionStr === 'deleted') {
        this.prepareDefinitions = this.prepareDefinitions
          .filter(item => item.url !== rowItem.url)
        return
      }
      this.definitionVisible = true
      this.definitionInfo = {
        type: rowItem.type,
        url: rowItem.url
      }
    }
  }
}
</script>

<style scoped>

</style>
