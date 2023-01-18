<template>
      <div class="grid">
        <div class="col-8">
            <ImageComponent :imageSrc="imageSrc" />
            <ExtractionTable v-if="isMounted" :extracted_data="tableData" 
                             :appendParameter="appendParameter"/>
        </div>
        <div class="col-4">
            <ParameterList v-model:parameters="parameters"/>
        </div>
    </div>

</template>

<script setup>
import axios from "axios"
import ExtractionTable from './ExtractionTable.vue' 
import ImageComponent from './ImageComponent.vue'
import ParameterList from './ParameterList.vue' 
import {ref, onMounted} from 'vue'

const imageSrc=ref('')
const tableData=ref([])
const parameters=ref([])
const isMounted=ref(false)

const appendParameter = formData => {parameters.value.concat(formData); console.log(parameters.value);};
         
onMounted(() => {

  // this.jsondata=fake_data
  axios.get("https://xdd.wisc.edu/askem/object/e962b768-2969-479b-b90b-9beb372cf5bc").then((resp) => {
    let extraction_data=resp.data['success']['data'][0]["properties"]
    let contentJson=extraction_data['contentJSON']

    let array_of_rows=[]
    for(let content in contentJson){
      console.log(content)
      let row_extracted= Object.keys(contentJson[content]).map(key => contentJson[content][key]);
      array_of_rows.push(row_extracted)
    }
    tableData.value=array_of_rows

    isMounted.value=true

    imageSrc.value="data:image/jpeg;base64,"+extraction_data['image']
  })
  });
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
