<template>
  <div id="example1">
    <hot-table ref="hotTableComponent" :settings="hotSettings"></hot-table><br/>
    <button v-on:click="swapHotData" class="controls">Load new data!</button>
    <button @click="visibleMenu = true">Add parameter</button>
    <ParameterMenu v-model:visibleMenu="visibleMenu" :appendParameter="(param)=>{$el.ownerDocument.defaultView.console.log(param)}"/>
  </div>

  <!-- <hot-table :class="className" :style="style" settings={settings} :data="extracted_data" :rowHeaders="true" :colHeaders="true"></hot-table> -->
  <hot-table id="test" :settings="hotSettingss"></hot-table>

</template>

<script>
  import { ref } from 'vue';
  import { HotTable } from '@handsontable/vue3';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';
  import { ContextMenu } from 'handsontable/plugins/contextMenu';
  import ParameterMenu from './ParameterMenu'

  // register Handsontable's modules
  registerAllModules();

  export default {
  name: 'ExtractionTable',
  setup() {
    const visibleMenu = ref(false);

    return { visibleMenu };
  },
  data() {
    return {
      hotSettingss: {
        data: [
          ['A1', 'B1', 'C1', 'D1', 'E1'],
          ['A2', 'B2', 'C2', 'D2', 'E2'],
          ['A3', 'B3', 'C3', 'D3', 'E3'],
          ['A4', 'B4', 'C4', 'D4', 'E4'],
          ['A5', 'B5', 'C5', 'D5', 'E5'],
        ],
        colHeaders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      },
      hotSettings: {
        data: [
          ['A1', 'B1', 'C1', 'D1', 'E1'],
          ['A2', 'B2', 'C2', 'D2', 'E2'],
          ['A3', 'B3', 'C3', 'D3', 'E3'],
          ['A4', 'B4', 'C4', 'D4', 'E4'],
          ['A5', 'B5', 'C5', 'D5', 'E5'],
        ],
        colHeaders: true,
        selectionMode: 'multiple',
        contextMenu: {
          items: {
            'row_above': {
              name: 'Insert row above this one (custom name)'
            },
            'row_below': {},
            "copy":{name:"copy"},
            "paste":{name:"paste"},
            'separator': ContextMenu.SEPARATOR,
            'clear_custom': {
              name: 'Clear all cells (custom)',
              callback() {
                this.clear();
              }
            }
          }
        },
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
    // data() {
    //   return {
    //     settings:{
    //       contextMenu: true,
    //       licenseKey:'non-commercial-and-evaluation',
    //       contextMenu:{
    //         items: {
    //         'row_above': {
    //           name: 'Insert row above this one (custom name)'
    //         },
    //         'row_below': {},
    //         'separator': ContextMenu.SEPARATOR,
    //       }}
          
    //     },
    //     data: [
    //       ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    //       ['2016', 10, 11, 12, 13],
    //       ['2017', 20, 11, 14, 13],
    //       ['2018', 30, 15, 12, 13]
    //     ],
    //     className: 'my-custom-classname',
    //   style: 'height:auto; width:auto, overflow: hidden; border: 1px solid blue;'
        
    //   };
    // },
    props: {
      extracted_data: Array
    },   
    components: {
      HotTable,
      ParameterMenu
    },
    beforeMount(){
      this.hotSettings["data"]=this.extracted_data

    },
    mounted(){
      //console.log(this.extracted_data)
      //let hot=document.getElementById('test')
    }
  };
</script>
