<template>
  <el-container>
    <el-header>
      <el-input
        v-model="searchCondition.pageId"
        placeholder="页面id"
        style="width: 200px;"
        size="mini"
        clearable
        @keyup.enter.native="setFilterOption"
      />
      <el-input
        v-model="searchCondition.pageName"
        placeholder="页面名称"
        style="width: 200px;"
        size="mini"
        clearable
        @keyup.enter.native="setFilterOption"
      />
      <el-input
        v-model="searchCondition.floorId"
        placeholder="关联楼层id"
        style="width: 200px;"
        size="mini"
        clearable
        @keyup.enter.native="setFilterOption"
      />
      <el-input
        v-model="searchCondition.floorName"
        placeholder="关联楼层名称"
        style="width: 200px;"
        size="mini"
        clearable
        @keyup.enter.native="setFilterOption"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="beginSearch"
      >
        搜索
      </el-button>
      <el-button
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="targetAddContentPage"
      >
        新增内容
      </el-button>
    </el-header>
    <el-main>
      <el-table
        :data="contents.items"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top: 20px"
        @sort-change="sortHandle"
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
        <el-table-column label="是否是单品" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <el-tag v-if=" scope.row.type===1">单品</el-tag>
            <el-tag v-else type="warning">剧集</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="内容类型" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ getContentNameByNum( scope.row.contentType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="editContent(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="deleteContent(row,'deleted')"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <Pagination :total="contents.total" @change="changePage" />
    </el-footer>
  </el-container>
</template>

<script>
import Pagination from '@components/Pagination'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      searchCondition: {
        pageId: '',
        pageName: '',
        floorId: '',
        floorName: ''
      }
    }
  },
  computed: {
    ...mapState('content', {
      contents: s => s.contents
    }),
    getContentNameByNum() {
      return (value) => {
        const typeMap = {
          '1': '电影',
          '2': '电视剧',
          '3': '动漫',
          '4': '综艺',
          '5': '少儿',
          '6': '子集',
          '7': '短视频'
        }
        return typeMap[value + '']
      }
    }
  },
  mounted() {
    this.getContent()
  },
  created() {
    this.SET_EDIT_CONTENT({})
  },
  methods: {
    ...mapMutations('content', {
      SET_EDIT_CONTENT: 'SET_EDIT_CONTENT'
    }),
    ...mapActions('content', {
      'getContent': 'getContent',
      'delContent': 'delContent'
    }),
    editContent(row) {
      this.SET_EDIT_CONTENT(row)
      this.$router.push({
        name: 'contentAdd'
      })
    },

    deleteContent(row) {
      this.$confirm(`是否删除 ${row.contentName}?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.SET_EDIT_CONTENT({})
        await this.delContent(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    setFilterOption() {
    },
    beginSearch() {
    },
    targetAddContentPage() {
      this.$router.push({
        name: 'contentAdd'
      })
      this.SET_EDIT_CONTENT({})
    },
    sortHandle() {
    },
    changePage(pageNum) {
      this.getContent(pageNum)
      this.SET_EDIT_CONTENT({})
    }
  }
}
</script>

<style scoped>
  .el-header {
    line-height: 60px;
  }

  .el-footer {
    text-align: center;
  }
</style>
