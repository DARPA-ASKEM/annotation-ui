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
import { computed, defineProps, defineEmits } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import axios from 'axios';
import toSnakeCase from '../utils.js';

const emit = defineEmits(['update:parameters', 'parameter-removed']);
const props = defineProps(["parameters"]);

const parameters = computed({
        get: () => props.parameters,
        set: val => emit('update:parameters', val),
});

const removeParam = ({ index }) => emit('parameter-removed', index);
const submit = () => {
        axios.post('http://localhost:8001/parameters', parameters.value.map(toSnakeCase))
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
};

</script>

