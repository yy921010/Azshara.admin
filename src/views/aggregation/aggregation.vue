<template>
  <div class="app-container">
    <table-filter @onCreate="addAggregation" />
    <el-table
      :data="aggregation.items"
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
      <el-table-column label="楼层名" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="楼层样式" prop="name" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorStyle }}</span>
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
          <el-button type="primary" size="mini" @click="editAggregation(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="deleteAggregation(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="aggregation.total" @change="paginationChange" />
  </div>
</template>

<script>
import Pagination from '@components/Pagination'
import TableFilter from '@components/TableFilter'
import { getAggregation } from '@api/aggregation-service'
export default {
  name: 'Aggregation',
  components: {
    Pagination,
    TableFilter
  },
  data() {
    return {
      aggregation: {}
    }
  },
  mounted() {
    this.getAggregation()
  },
  methods: {
    async getAggregation(pageNumber = 1) {
      const pageSize = 20
      this.aggregation = await getAggregation({
        pageNumber,
        pageSize
      })
    },
    addAggregation() {},
    editAggregation() {},
    deleteAggregation() {},
    paginationChange(pageNumber) {
      this.getAggregation(pageNumber)
    }
  }
}
</script>

<style scoped>

</style>
