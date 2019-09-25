<template>
  <div class="app-container">
    <table-filter @onCreate="createVideo" />
    <el-table
      :data="video.items"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 20px"
    >
      <el-table-column label="序号" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容名称" prop="contentName" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剧种" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-tag v-if=" scope.row.type===1">单品</el-tag>
          <el-tag v-else type="warning">剧集</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="内容类型" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.updateAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="editVideo(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deleteVideo(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="video.total" @change="paginationChange" />
  </div>
</template>

<script>
import TableFilter from '@components/TableFilter'
import { getVideo, deleteVideo, getVideoExtra } from '@api/video-service'
import Pagination from '@components/Pagination'
import { mapMutations } from 'vuex'

export default {
  name: 'Video',
  components: {
    TableFilter,
    Pagination
  },
  data() {
    return {
      video: {}
    }
  },
  mounted() {
    this.getVideo()
  },
  methods: {
    ...mapMutations('content', {
      changeVideoInfo: 'CHANGE_VIDEO_INFO'
    }),
    async getVideo(pageNumber = 1) {
      const pageSize = 20
      const videoResult = await getVideo({
        pageNumber,
        pageSize
      })
      this.video = videoResult
    },
    createVideo() {
      this.changeVideoInfo({
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
      })
      this.$router.push({
        name: 'contentDetail'
      })
    },
    paginationChange(num) {
      this.getVideo(num)
    },
    async editVideo(video) {
      const contentId = video.contentId
      const { actors, definitions, genres, pictures } = await getVideoExtra(contentId)
      if (contentId) {
        video.actors = actors.filter(item => item.type === 2) || []
        video.director = actors.filter(item => item.type === 1) || []
        video.definitions = definitions || []
        video.genre = genres[0] || []
        video.pictures = pictures
      }
      this.changeVideoInfo(video)
      this.$router.push({
        name: 'contentDetail'
      })
    },
    deleteVideo({ contentName, id }) {
      this.$confirm(`是否删除${contentName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteVideo(id)
        await this.getVideo()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
