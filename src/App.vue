<template>
    <!-- <router-link :to="{ name: 'Annotation', }">Home</router-link> | -->
    <router-view />
  <!-- <AnnotationComponent msg="Started Annotation UI"/> -->
</template>

<script setup>
import AnnotationComponent from './components/ExtractionAnnotator.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
