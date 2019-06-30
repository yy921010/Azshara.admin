<template>
  <el-pagination
    background
    layout="total,prev, pager, next"
    @current-change="changePage"
    :total="total"
  />
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

</style>
