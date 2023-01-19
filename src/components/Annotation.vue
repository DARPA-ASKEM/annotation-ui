<template>
      <div class="grid">
        <div class="col-8">
            <ImageComponent :imageSrc="imageSrc" />
            <ExtractionTable @cell-selected="handleCellSelected" v-if="isMounted" :extractedData="tableData" ></ExtractionTable>
            <Button class="p-button-sm" @click="addParameter">Add parameter manually</Button>
            <ParameterMenu v-model:visibleMenu="visibleMenu" :appendParameter="appendParameter" />
        </div>
        <div class="col-4">
            <ParameterList v-model:parameters="parameters"/>

        </div>
    </div>

</template>

<script setup>
import axios from "axios";
import ExtractionTable from './ExtractionTable.vue';
import ParameterMenu from './ParameterMenu.vue';
import ImageComponent from './ImageComponent.vue';
import ParameterList from './ParameterList.vue' ;
import {ref, onMounted} from 'vue';
import Button from 'primevue/button';
import { storeCell } from '../stores/cellValue.js';

const imageSrc=ref('');
const tableData=ref([]);
const parameters=ref([]);
const isMounted=ref(false);
const visibleMenu=ref(false);


const appendParameter = formData => parameters.value.push(formData);
         
function handleCellSelected(row,cell,value){
  console.log(cell,row, value);

  // storeCell._rawValue.setSelectedValue(value);
  // forceRerender()
  visibleMenu.value=true;
}

function addParameter(){

  storeCell.value.setSelectedValue("");
  visibleMenu.value = true;
}

onMounted(() => {

  axios.get("https://xdd.wisc.edu/askem/object/e962b768-2969-479b-b90b-9beb372cf5bc").then((resp) => {
    let extraction_data=resp.data['success']['data'][0]["properties"];
    let contentJson=extraction_data['contentJSON'];

    let rows=[]
    for(let content in contentJson){
      let row_extracted= Object.keys(contentJson[content]).map(key => contentJson[content][key]);
      rows.push(row_extracted);
    }
    tableData.value=rows;

    isMounted.value=true;

    imageSrc.value="data:image/jpeg;base64,"+extraction_data['image'];
  })
  });
  

</script>

