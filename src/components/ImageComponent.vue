<template>
  <div>
      <h3>Uploaded Image</h3>
      <Image :imageStyle="{width:'100%'}" :imageClass="imageclass"  id="image_component" :src="image_src" alt="Image" preview />
  </div>
</template>

<script setup>

import Image from 'primevue/image';
import { defineProps } from "vue";
const props = defineProps({
  image_src: String,
});


</script>

<style scoped>
h3 {
  margin: 0 0 0;
}

</style>
