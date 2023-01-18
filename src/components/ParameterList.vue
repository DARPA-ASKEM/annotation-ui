<template>
	<div>
        <DataTable :value="parameters" responsiveLayout="scroll">
            <Column field="name" header="Name"/>
            <Column field="defaultValue" header="Default"/>
            <Column field="type" header="Type"/>
            <Column field="curie" header="CURIE"/>
            <Column field="stateVariable" header="State Variable"/>
						<Column headerStyle="width: 1rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
             <template #body>
              <Button type="button" icon="pi pi-times" 
							        class="p-button-outlined p-button-danger p-button-rounded"/>
             </template>
            </Column>
        </DataTable>
	</div>
</template>

<script setup>
import { ref, computed, defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const props = defineProps(["parameters"]);

const parameters = computed({
        get: () => props.parameters,
        set: sidebarValue => emit('update:parameters', sidebarValue),
});


</script>

