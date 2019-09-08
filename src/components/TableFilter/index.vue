<template>
  <div class="filter-container">
    <el-input v-model="title" placeholder="搜索标题" style="width: 200px;" class="filter-item" size="mini" />
    <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
      搜索
    </el-button>
    <el-button class="filter-item" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-edit" @click="handleCreate">
      新增
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    handleCreate() {
      this.$emit('onCreate')
    },
    handleFilter() {
      this.$emit('onSearch', this.title)
    }
  }
}
</script>

<style scoped>
  .filter-container{
    padding-bottom: 10px;
  }
</style>
