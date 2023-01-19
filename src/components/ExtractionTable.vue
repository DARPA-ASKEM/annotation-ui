<template>
  <div >
    <hot-table ref="hotTableComponent" :settings="hotSettings"></hot-table><br/>
    <!-- {{ storeCell.selectedValue }} -->
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { HotTable } from '@handsontable/vue3';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';
  import { ContextMenu } from 'handsontable/plugins/contextMenu';
  import { storeCell } from '../stores/cellValue.js';
  // register Handsontable's modules
  registerAllModules();
  export default {
  name: 'ExtractionTable',
  setup(props) {

    const visibleMenu = ref(false);
    return { visibleMenu };
  },
  data() {
    return {
      visibleMenu:false,
      annotatedCells: [],
      hotSettings: {
        data: [],
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
    props: {
      extractedData: Array,
    },   
    components: {
      HotTable,
    },
    methods: {
        afterSelectionEnd: function (row, column) {
          let hotTable = this.$refs.hotTableComponent.hotInstance;
          let value = hotTable.getDataAtCell(row, column);
          storeCell._rawValue.setSelectedValue(value)         

          this.$emit('cell-selected', row, column, value);
        },
        annotate: function (hotTable, td, row, col, prop, initialValue) {
          
          let value = hotTable.getDataAtCell(row, col);
          storeCell.value.setSelectedValue(value)     
          this.$emit('visibleMenu', true, );

          this.$emit('cell-selected', row, col, value);
        },
        renderCell: function (hotTable, td, row, col, prop, value) {
          td.innerText = value;
          if (value!=""){
          let button = document.createElement('button');
          // button.innerHTML = " ";
          let icon = document.createElement('i')
          icon.className=" pi pi-file-edit"
          icon.style.float="center"
          icon.style
          button.appendChild(icon)
          // button.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/Circle-icons-pencil_2.svg")';
          // button.style.display="flex";
          // button.style.justify_content= "center";
          button.style.align_items= "center";
          button.style.backgroundColor="transparent"
          button.style.border="none"
          
          button.style.height = '1.4em';
          button.style.width = '1.4em';
          button.style.position = 'relative';
          button.style.backgroundPosition = 'center';
          button.style.float="right";
          button.style.backgroundSize = 'contain';
          button.addEventListener("click", () => this.annotate(hotTable, td, row, col, prop, value), false);
          td.appendChild(button);
          }
          
          return td;
        },
    },
    beforeMount(){
      this.hotSettings["data"]=this.extractedData;
      this.hotSettings['renderer'] = this.renderCell;
    },
    mounted(){
      // let hotTable = this.$refs.hotTableComponent.hotInstance;
      // hotTable.addHook("afterSelectionEnd", this.afterSelectionEnd, this);
    }
  };
</script>
