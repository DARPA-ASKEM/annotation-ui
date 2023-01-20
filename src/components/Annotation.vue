<template>
      <div class="grid">
        <div class="col-8">
            <label for="xddId">Enter XDD ID</label>
            <!-- <InputText id="xddId" :style="{float:right}" class="p-inputtext-sm spacer"
                   type="text" v-model="xddId" />
            <Button @click="updateExtractedArtifact">Submit</Button> -->

            <ImageComponent v-if="isMounted" :imageSrc="imageSrc" />
            <ExtractionTable :key="tableKey"  @cell-selected="handleCellSelected" v-if="isMounted" :extractedData="tableData"></ExtractionTable>
            <Button v-if="isMounted" class="p-button-sm" @click="addParameter">Add parameter manually</Button>
            <ParameterMenu   :key="componentKey" v-model:visibleMenu="visibleMenu" :appendParameter="appendParameter" 
                           v-bind:selectedValue="selectedValue" />

        </div>
        <div class="col-4">
            <ParameterList v-model:parameters="parameters"/>
{{ id }}
        </div>
    </div>

</template>

<script setup>
import axios from "axios";
import ExtractionTable from './ExtractionTable.vue';
import ParameterMenu from './ParameterMenu.vue';
import ImageComponent from './ImageComponent.vue';
import ParameterList from './ParameterList.vue' ;
import {ref, onMounted, computed} from 'vue';
import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import { useRoute } from 'vue-router'
// import { url } from "inspector";
const route = useRoute()
console.log(route)


const imageSrc=ref('');
const tableData=ref([]);
const parameters=ref([]);
const isMounted=ref(false);
const visibleMenu=ref(false);
const selectedValue=ref("");
const componentKey = ref(0);
const tableKey=ref(0)
const xddId=ref("")
const forceRerenderMenu = () => {
  componentKey.value += 1;
};
const forceRerenderTable = () => {
  tableKey.value += 1;
};
const appendParameter = formData => parameters.value.push(formData);
 
function updateExtractedArtifact(){
  getXDDArtifact(xddId.value)
}
function handleCellSelected(row,cell,value){
  console.log(cell,row, value);
  selectedValue.value=value;
  forceRerenderMenu()
  visibleMenu.value=true;
}

function addParameter(){
  selectedValue.value="";
  forceRerenderMenu()
  visibleMenu.value = true;
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
    console.log(tableData)

    isMounted.value=true;

    imageSrc.value="data:image/jpeg;base64,"+extraction_data['image'];
    forceRerenderTable()

  })
}
onMounted(() => {
  let params = (new URL(document.location)).searchParams;
  xddId.value=params.get('id')
  getXDDArtifact(xddId.value)
 
  });
  

</script>

<style scoped>
.spacer{
    margin:12px;
    width: 300px;

}
.matchInput{
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    color: #495057;
    border: 1px solid #ced4da;

}
</style>