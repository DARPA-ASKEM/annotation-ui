<template>
  <div>
      <h3>Uploaded Image</h3>
      <Image :imageStyle="{width:'100%'}" :imageClass="imageclass"  id="image_component" :src="image_src" alt="Image" preview />
  </div>
</template>

<script setup>

import Image from 'primevue/image';
import { defineProps, reactive } from "vue";
const props = defineProps({
  image_src: String,
});



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0 0 0;
}

img {
    width:50px; /* you can use % */
    height: auto;
}
</style>
