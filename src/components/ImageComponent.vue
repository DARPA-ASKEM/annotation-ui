<template>
  <div>
      <Image :imageStyle="{width:'100%'}" 
             id="image-component" :src="imageSrc" alt="Extracted Table" preview />
  </div>
</template>

<script setup>

import Image from 'primevue/image';
import { defineProps } from "vue";
const props = defineProps({
  imageSrc: String,
});


</script>

<style scoped>
h3 {
  margin: 0 0 0;
}

</style>
