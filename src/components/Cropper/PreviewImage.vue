<template>
  <div class="poster">
    <div class="poster__mask">
      <el-button type="danger" icon="el-icon-delete" circle class="delete-button" @click="deletePoster(id)" />
    </div>
    <img class="poster__main" :src="getShowSrc" :alt="name">
  </div>
</template>

<script>
import Settings from '../../settings'

export default {
  name: 'PreviewImage',
  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    getShowSrc() {
      return this.name ? Settings.imageService + this.src + '/' + this.name : Settings.imageService + this.src
    }
  },
  methods: {
    deletePoster(imageId) {
      this.$emit('onImage', imageId)
    }
  }
}
</script>

<style scoped lang="scss">
  .delete-button{
    transition: display 0.5s;
    display: none;
  }
  .poster {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px darkgray solid;
    .poster__mask{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 5;
      width: 100%;
      height: 100%;
      &:hover{
       &>.delete-button{
         display: block;
       }
      }
    }
    .poster__main {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
