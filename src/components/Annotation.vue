<template>
      <div class="grid">
        <div  class="col">
            <ImageComponent :image_src="image_src"></ImageComponent>
        </div>
        <div class="col-8">
         <ExtractionTable v-if="isMounted" :extracted_data="table_data"></ExtractionTable>
        </div>
    </div>

</template>

<script setup>
import axios from "axios"
import ExtractionTable from './ExtractionTable.vue' 
import ImageComponent from './ImageComponent.vue'
import {ref, onMounted} from 'vue'

const image_src=ref('')
const table_data=ref([])
const isMounted=ref(false)

         
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
    table_data.value=array_of_rows

    isMounted.value=true

    image_src.value="data:image/jpeg;base64,"+extraction_data['image']
  })
  });
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
