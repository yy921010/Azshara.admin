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
        :data="contentList"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top: 20px"
        @sort-change="sortHandle"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面id" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pageId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面名称" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pageName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联楼层名称" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.floorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联楼层id" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.floorId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleModifyStatus(row,'deleted')"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <Pagination :total="total" @change="changePage" />
    </el-footer>
  </el-container>
</template>

<script>
import Pagination from '@components/Pagination'

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
      },
      contentList: [],
      total: 200000
    }
  },
  methods: {
    setFilterOption() {
    },
    beginSearch() {
    },
    targetAddContentPage() {
      this.$router.push({
        name: 'contentAdd'
      })
    },
    sortHandle() {
    },
    changePage() {
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
