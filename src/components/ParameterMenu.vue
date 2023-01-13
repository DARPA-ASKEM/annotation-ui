<template>
<div>
	<Sidebar v-model:visible="visibleMenu" position="bottom">
		<h3>Annotation should happen here</h3>
	</Sidebar>
  <Button icon="pi pi-arrow-right" @click="visibleMenu = true" />
</div>
</template>

<script>
import { ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button'; // DELETE


const visibleMenu = ref(false);
export default {
	name: 'ParameterMenu',
	components: {
		Sidebar,
		Button
	},
	setup() {
		const visibleMenu = ref(false);

		return { visibleMenu }
	}
}
</script>