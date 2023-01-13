<template>
    <div>
        <h3>Uploaded Image</h3>
        <img id="image_component" :src="image_src"/>
        <!-- <Image :imageClass="imageclass"  :src="image_src" alt="Image Text"></Image> -->

    </div>
  </template>
  
  <script>
// import Image from 'primevue/image';
  import "/node_modules/primeflex/primeflex.css"

  export default {
    name: 'ImageComponent',
    props: {
      image_src: String
    },
    // data() {
    //       return {
    //         jsondata: null,
    //         image_src:null,
    //         extraction_data:null
    //       }
    //     },
    components: {
        // Image,
      },
    beforeMount(){
      //console.log(`Image source: ${this.image_src}`)
    }
  
  }
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

  img {
      width:400px; /* you can use % */
      height: auto;
  }
  </style>
  