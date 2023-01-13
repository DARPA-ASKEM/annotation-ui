<template>
      <div class="grid">
        <div  class="col">
        
            <ImageComponent :image_src="image_src"></ImageComponent>
        </div>
        <div class="col">
         <ExampleComponent v-if="isMounted" :extracted_data="table_data"></ExampleComponent>

        </div>
    </div>

</template>

<script>
// import Image from 'primevue/image';
import ImageComponent from './image.vue'
import ExampleComponent from './table.vue' 

// import fake_data from '../assets/fake_data.json';
// import VueTable from 'vuejs-spreadsheet';
import axios from "axios"
export default {
  name: 'AnnotationComponent',
  props: {
    msg: String
  },
  data() {
        return {
          jsondata: null,
          image_src:"hi",
          extraction_data:null,
          table_data:null,
          isMounted:false
        }
      },
  components: {
      // Image,
      ImageComponent,
      ExampleComponent
    },
  methods:{
    onSelect(selected){
      console.log(selected)
    }
  },
  mounted(){
  },
  //   getdata() {
  //     console.log('e')
  //     const result=fetch("https://xdd.wisc.edu/askem/object/e962b768-2969-479b-b90b-9beb372cf5bc")
  //       .then((res) => {
  //           res.json();
  //           })
  //       .then((d) => {
  //         // d.data
  //         console.log(d.data)
  //         } )
  //   console.log(result)    

         
  // },
  beforeMount(){
    // this.jsondata=fake_data
    axios.get("https://xdd.wisc.edu/askem/object/e962b768-2969-479b-b90b-9beb372cf5bc").then((resp) => {
      this.extraction_data=resp.data['success']['data'][0]["properties"]
      this.contentJson=this.extraction_data['contentJSON']
      let headers=this.contentJson[0] 
      this.columns=headers

      let final=[]
      for(let content in this.contentJson){
        let row_extracted= Object.keys(this.contentJson[content]).map(key => this.contentJson[content][key]);
        final.push(row_extracted)
      }
      this.table_data=final

      this.isMounted=true

      console.log(this.table_data)
      this.image_src="data:image/jpeg;base64,"+this.extraction_data['image']
    })
  }}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.column {
  float: left;
  width: 45.33%;
  background-clip: content-box;

  background-color: #D3D3D3;
  padding:5px
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.image{
  max-width: 100%;
}

</style>
