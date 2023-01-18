<template>
	<div>
        <DataTable v-model="parameters" responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="default" header="Default"></Column>
            <Column field="type" header="Type"></Column>
            <Column field="curie" header="CURIE"></Column>
            <Column field="state" header="State Variable"></Column>
        </DataTable>
	</div>
</template>

<script setup>
import { ref, computed, defineComponent } from 'vue';
import DataTable from 'primevue/datatable';

const props = defineProps(["parameters"]);

const parameters = computed({
        get: () => props.visibleMenu,
        set: sidebarValue => emit('update:parameters', sidebarValue),
});


</script>

