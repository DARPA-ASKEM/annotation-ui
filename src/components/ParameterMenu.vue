<template>
<div>
	
  <!-- <Button icon="pi pi-arrow-right" @click="visibleMenu = true" /> -->
</div>
</template>

<script>
import { ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button'; // DELETE


const visibleMenu = ref(false);
export default {
	name: 'ParameterMenu',
	data() {
        return {
          visibleMenu:true
        }
      },
	components: {
		Sidebar,
		Button
	},
	methods:{
//		const visibleMenu = ref(false);
		
	}
}
</script>
