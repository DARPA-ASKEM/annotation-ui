<template>
  <div id="example1">
    <hot-table ref="hotTableComponent" :settings="hotSettings">
    </hot-table><br/>
    <button v-on:click="swapHotData" class="controls">Load new data!</button>
    <div>
    {{ selectedValue }}
    </div>
  </div>

  <!-- <hot-table :class="className" :style="style" settings={settings} :data="extracted_data" :rowHeaders="true" :colHeaders="true"></hot-table> -->
  <!-- <hot-table id="test" :settings="hotSettingss"></hot-table> -->

</template>

<script>
  import { HotTable } from '@handsontable/vue3';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';
  import { ContextMenu } from 'handsontable/plugins/contextMenu';

  // register Handsontable's modules
  registerAllModules();

  export default {
  name: 'ExtractionTable',
  data() {
    return {
      selectedValue: "value",
      hotSettings: {
        data: [],
        colHeaders: true,
        selectionMode: 'single',
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
      extracted_data: Array
    },   
    components: {
      HotTable,

    },
    methods: {
        afterSelectionEnd: function (row, column) {
            let hotTable = this.$refs.hotTableComponent.hotInstance;
            let value = hotTable.getDataAtCell(row, column);
            console.log(value);
            this.selectedValue = value;
            this.$emit('cell-selected', row, column, value);
        },
    },
    beforeMount(){
      this.hotSettings["data"]=this.extracted_data

    },
    mounted(){
      let hotTable = this.$refs.hotTableComponent.hotInstance;
      hotTable.addHook("afterSelectionEnd", this.afterSelectionEnd, this);
    }
  };
</script>