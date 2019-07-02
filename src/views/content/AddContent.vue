<template>
  <el-container>
    <el-header />
    <el-main>
      <el-form ref="contentForm" :model="contentInfo" label-width="140px" :rules="contentRule">
        <el-form-item label="内容名称" prop="contentName">
          <el-input v-model="contentInfo.contentName" placeholder="请输入内容名称" :width="200" />
        </el-form-item>
        <el-form-item label="影片类型" prop="type">
          <el-select v-model="contentInfo.type" placeholder="影片类型" value>
            <el-option label="单品" :value="1" />
            <el-option label="剧集" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="contentInfo.type === 2" label="子集序号">
          <el-input v-model="contentInfo.serialNumber" placeholder="子集序号" />
        </el-form-item>
        <el-form-item label="内容类型" prop="contentType">
          <el-select v-model="contentInfo.contentType" placeholder="影片内容类型" value>
            <el-option
              v-for="(contentType,index) in contentTypeRender"
              :key="index"
              :label="contentType.label"
              :value="contentType.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容流派" prop="genres">
          <el-select v-model="contentInfo.genres" multiple placeholder="影片内容类型" value>
            <el-option v-for="(genre,index) in genres" :key="index" :label="genre" :value="genre" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容评级" prop="rating">
          <el-select v-model="contentInfo.rating" placeholder="内容评级" value>
            <el-option
              v-for="(rating,index) in ratingsRender"
              :key="index"
              :label="rating.label"
              :value="rating.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="参演人员">
          <el-select
            v-model="contentInfo.actors"
            filterable
            remote
            reserve-keyword
            multiple
            :remote-method="getPersonByName"
            placeholder="请输入人员"
            :loading="loading"
          >
            <el-option
              v-for="(item,index) in persons"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button v-if="persons.length ===0" type="info" size="mini" @click="addActorHandle">添加</el-button>
        </el-form-item>
        <el-form-item label="内容标题" prop="title">
          <el-input v-model="contentInfo.title" placeholder="请输入内容标题" />
        </el-form-item>
        <el-form-item label="内容副标题" prop="subtitle">
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
        <el-form-item label="添加媒资">
          <el-button type="primary" size="mini" @click="openDefinition">添加</el-button>
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
                <el-button type="primary" size="mini" @click="definitionHandle(row)">编辑</el-button>
                <el-button
                  v-if="row.status!='deleted'"
                  size="mini"
                  type="danger"
                  @click="definitionHandle(row,'deleted')"
                >删除</el-button>
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
      <add-person-component :person-detail="personDetail" :person-add-dialog="personAddDialog" @onDialogAction="addPerson" />
    </el-main>
    <el-footer />
  </el-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import PersonService from '@api/Person'
import cropper from '@components/Cropper'
import AddPersonComponent from './AddPerson'
export default {
  name: 'AddContent',
  components: {
    cropper,
    AddPersonComponent
  },
  data() {
    return {
      personDetail: {
        name: '',
        type: 1,
        introduce: ''
      },
      personAddDialog: false,
      loading: false,
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
        actors: [],
        definition: []
      },
      persons: [],
      contentRule: {
        contentName: [
          {
            required: true,
            message: '请输入内容名称',
            trigger: 'blur'
          }
        ],
        type: [{
          required: true,
          message: '请输入影片类型',
          trigger: 'blur'
        }],
        contentType: [
          {
            required: true,
            message: '请输入内容类型',
            trigger: 'blur'
          }
        ],
        genres: [
          {
            required: true,
            message: '请输入内容流派',
            trigger: 'blur'
          }
        ],

        rating: [
          {
            required: true,
            message: '请输入年龄级别',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            required: true,
            message: '请输入副标题',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('content', {
      contentTypeRender: s => s.contentTypeRender,
      ratingsRender: s => s.ratingsRender,
      genres: s => s.genres,
      editContentObj: s => s.editContentObj
    })
  },
  mounted() {
    if (this.editContentObj.id) {
      this.contentInfo.contentName = this.editContentObj.contentName
      this.contentInfo.type = this.editContentObj.type
      this.contentInfo.contentType = this.editContentObj.contentType
      this.contentInfo.rating = this.editContentObj.rating
      this.contentInfo.title = this.editContentObj.title
      this.contentInfo.subtitle = this.editContentObj.subtitle
      this.contentInfo.introduce = this.editContentObj.introduce
      this.contentInfo.genres = this.editContentObj.genres
      this.contentInfo.actors = this.editContentObj.actors
      this.prepareDefinitions = this.editContentObj.definition
    }
  },
  beforeDestroy() {
    this.SET_EDIT_CONTENT({})
  },
  methods: {
    ...mapMutations('content', {
      SET_EDIT_CONTENT: 'SET_EDIT_CONTENT'
    }),
    ...mapActions('content', {
      addContent: 'addContent',
      editContent: 'editContent'
    }),
    addPerson({ actionStr, personDetail }) {
      this.personAddDialog = false
      if (actionStr === 'finish') {
        PersonService.add(personDetail).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
        })
      }
    },
    async onSubmit() {
      this.contentInfo.definition = this.prepareDefinitions
      if (this.editContentObj.id) {
        await this.editContent(this.contentInfo)
        this.$router.push({
          name: 'contentIndex'
        })
      } else {
        this.addContent(this.contentInfo)
      }

      // this.$refs.contentForm.validate((valid) => {
      //   if (valid) {
      //     this.addContent(this.contentInfo)
      //   } else {
      //     return false
      //   }
      // })
    },
    addActorHandle() {
      this.personAddDialog = true
      this.personDetail = {
        name: '',
        type: 1,
        introduce: ''
      }
    },
    getPersonByName(key) {
      if (key !== '') {
        PersonService.get({
          name: key
        }).then(resp => {
          this.persons = resp.items
        })
      }
    },
    openDefinition() {
      this.definitionVisible = true
      this.prepareDefinitions = []
      this.definitionInfo.type = 0
      this.definitionInfo.url = ''
    },
    definitionDialogHandle(actionStr) {
      if (actionStr === 'cancel') {
        this.definitionVisible = false
        return
      }
      this.prepareDefinitions.push({
        type: this.definitionInfo.type,
        url: this.definitionInfo.url
      })
      this.definitionVisible = false
    },
    definitionHandle(rowItem, actionStr) {
      if (actionStr === 'deleted') {
        this.prepareDefinitions = this.prepareDefinitions.filter(
          item => item.url !== rowItem.url
        )
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
