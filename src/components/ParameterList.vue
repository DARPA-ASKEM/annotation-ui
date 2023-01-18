<template>
	<div>
        <DataTable :value="parameters" responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="defaultValue" header="Default"></Column>
            <Column field="type" header="Type"></Column>
            <Column field="curie" header="CURIE"></Column>
            <Column field="stateVariable" header="State Variable"></Column>
        </DataTable>
	</div>
</template>

<script setup>
import { ref, computed, defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps(["parameters"]);

const parameters = computed({
        get: () => props.parameters,
        set: sidebarValue => emit('update:parameters', sidebarValue),
});


</script>

