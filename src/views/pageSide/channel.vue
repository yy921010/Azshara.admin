<template>
  <div class="app-container">
    <table-filter/>
    <el-table
      :data="actor.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="频道名称" prop="channelName" align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="LOGO" prop=" logom" align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="播放地址" prop=",playUrl" align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import TableFilter from '@components/TableFilter'
  export default {
    name: "channel",
    components: {
      TableFilter
    },
    data() {
      return{
        actor:{ },
      }
    }
  }
</script>

<style scoped>

</style>
