<template>
	<div>
        <DataTable :value="parameters" responsiveLayout="scroll">
				    <template #header>
              <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Save to Data Service" @click="submit" />
              </div>
            </template>
            <Column field="name" header="Name"/>
            <Column field="defaultValue" header="Default"/>
            <Column field="type" header="Type"/>
            <Column field="curie" header="CURIE"/>
            <Column field="stateVariable" header="State Variable"/>
						<Column headerStyle="width: 1rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
             <template #body="row">
              <Button type="button" icon="pi pi-times" @click="removeParam(row)"
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

const removeParam = ({ index }) => parameters.value.splice(index, 1);
const submit = () => {};

const parameters = computed({
        get: () => props.parameters,
        set: sidebarValue => emit('update:parameters', sidebarValue),
});


</script>

