<template>
  <div class="pagination-container">
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :page-size="20"
      @current-change="changePage"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    total: {
      type: Number,
      default: 0,
      require: true
    }
  },
  methods: {
    changePage(evt) {
      this.$emit('change', evt)
    }
  }
}
</script>

<style scoped>
  .pagination-container{
    background: #fff;
    padding: 32px 16px;
    margin-top: 30px;
  }
</style>
