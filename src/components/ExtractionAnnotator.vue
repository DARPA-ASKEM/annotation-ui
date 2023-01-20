<template>
      <div class="grid">
        <div  v-if="!xddIdNotFound" class="col-8">
            <ImageComponent :imageSrc="imageSrc" />
            <ExtractionTable @cell-annotation="handleCellAnnotation" @cell-selection="handleCellSelection" v-if="isMounted" :extractedData="tableData"></ExtractionTable>
            <Button class="p-button-sm" @click="addParameter">Add parameter manually</Button>
            <ParameterMenu v-if="isMenuVisible" v-model:isMenuVisible="isMenuVisible" @parameter-appended="appendParameter"
                           :selectedValue="selectedValue" />
        </div>
        <div  v-if="!xddIdNotFound" class="col-4">
            <ParameterList v-model:parameters="parameters" @parameter-removed="removeParameter"/>

        </div>
        <div v-if="xddIdNotFound" class=col-12>
          <h1>XDD ID was not set in the url parameter.</h1>
            For local development you can set the url to http://localhost:8080/?id=e962b768-2969-479b-b90b-9beb372cf5bc
        </div>
    </div>

</template>
            <!-- appendParameter="appendParameter"  -->

<script setup>
import axios from "axios";
import ExtractionTable from './ExtractionTable.vue';
import ParameterMenu from './ParameterMenu.vue';
import ImageComponent from './ImageComponent.vue';
import ParameterList from './ParameterList.vue' ;
import {ref, onMounted} from 'vue';
import Button from 'primevue/button';

const imageSrc=ref('');
const tableData=ref([]);
const parameters=ref([]);
const isMounted=ref(false);
const isMenuVisible=ref(false);
const selectedValue=ref("");
const xddIdNotFound=ref(true)

const appendParameter = formData => parameters.value.push(formData);
         
function handleCellAnnotation(row,cell,value){
  selectedValue.value=value;
  isMenuVisible.value=true;
}

function addParameter(){
  selectedValue.value="";
  isMenuVisible.value = true;
}
function removeParameter(parameterIndex) {
  parameters.value.splice(parameterIndex, 1);
}
function handleCellSelection() {
  console.log("Selection", ...arguments);
}
function getXDDArtifact(xddId){
  axios.get("https://xdd.wisc.edu/askem/object/"+xddId).then((resp) => {
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
}
onMounted(() => {
  let xddId = (new URLSearchParams(document.location.search)).get('id');
  if(xddId !==null){
    xddIdNotFound.value=false
    getXDDArtifact(xddId)

  }else{
    xddIdNotFound.value=true

  }
 
  });
  
</script>
