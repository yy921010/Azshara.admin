<template>
  <div class="app-container">
    <table-filter @onCreate="addActor"></table-filter>
    <el-table
      :data="actor.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人名" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="scope">
          <span>{{ $dayjs(scope.row.updateAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="id" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="editActor(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deleteActor(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="actor.total" @change="paginationChange" />
    <actor-detail :detail="actorDetail" :is-show="detailVisible" @onDetail="onDetail" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getActor, addActor, updateActor, deleteActor } from '@api/actor-service'
import { getImage } from '@api/image-service'
import actorDetail from './actor-detail'
import { mapMutations } from 'vuex'
import { imageService } from '@/settings'
export default {
  name: 'Actor',
  components: {
    Pagination,
    actorDetail,
    TableFilter
  },
  data() {
    return {
      actor: {},
      actorDetail: {
        name: '',
        introduce: ''
      },
      detailVisible: false,
      detailStatus: ''
    }
  },
  mounted() {
    this.getActors()
  },
  methods: {
    ...mapMutations('image', {
      'addPreviewPicture': 'ADD_PICTURE_ARR'
    }),
    _initDetail({ name, id, introduce }) {
      this.actorDetail.name = name
      this.actorDetail.introduce = introduce
      this.actorDetail.id = id
    },
    async getActors(pageNumber = 1) {
      const pageSize = 20
      this.actor = await getActor({ pageNumber, pageSize })
    },

    async editActor({ name, introduce, id, pictureId }) {
      this.detailStatus = 'EDIT'
      this.detailVisible = true
      this._initDetail({
        name,
        introduce,
        id,
        pictureId
      })
      if (pictureId) {
        const imageObject = await getImage({
          mainId: pictureId
        })
        if (imageObject.length === 1) {
          this.addPreviewPicture({
            name: 'editPictureName',
            url: imageService + imageObject[0].url,
            id: imageObject[0].id
          })
        }
      }
    },

    async deleteActor({ id, name }) {
      this.$confirm(`是否删除${name}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteActor(id)
        await this.getActors()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },

    async addActor() {
      this.detailVisible = true
      this.detailStatus = 'ADD'
      this._initDetail({})
    },

    async onDetail({ action, detail, pictureId }) {
      this.detailVisible = false
      if (action === 'cancel') {
        this._initDetail({})
        this.detailStatus = ''
        return
      }
      let message
      switch (this.detailStatus) {
        case 'ADD':
          if (pictureId) {
            Object.assign(detail, {
              imageId: pictureId + ''
            })
          }
          await addActor(detail)
          this.getActors()
          message = '新增成功'
          break
        case 'EDIT':
          delete detail.imageId
          await updateActor({ actor: detail, pictureId }, detail.id)
          message = '更新成功'
      }
      this.$message({
        type: 'success',
        message
      })
    },
    paginationChange(num) {
      this.getActors(num)
    }
  }
}
</script>

<style scoped>

</style>
