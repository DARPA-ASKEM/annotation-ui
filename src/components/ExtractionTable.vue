<template>
  <div >
    <hot-table ref="hotTableComponent" :settings="hotSettings"></hot-table><br/>

  </div>
</template>

<style>
  .annotate-icon {
    float: "center",
  }

  .annotation-button {
      align-items: center;
      background-color: transparent;
      border: none;
      height: 1.4em;
      width: 1.4em;
      position: relative;
      background-position: center;
      float: right;
      background-size: contain;

  }
</style>

<script setup>
  import { ref, defineProps, defineEmits, onBeforeMount, onMounted } from 'vue';
  import { HotTable } from '@handsontable/vue3';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';
  import { ContextMenu } from 'handsontable/plugins/contextMenu';
  // register Handsontable's modules
  registerAllModules();

  const props = defineProps(['extractedData'])
  const emit = defineEmits(['cell-selection', 'cell-annotation', 'update:visibleMenu'])

  const hotTableComponent = ref(null);
  const hotSettings = ref({
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
  });

  const annotate = (td, row, col, prop, initialValue) =>{
    let hotTable = hotTableComponent.value.hotInstance;
    let value = hotTable.getDataAtCell(row, col);
    emit('update:visibleMenu', true);
    emit('cell-annotation', row, col, value);
  }
  
  const renderCell = (hotTable, td, row, col, prop, value) => {
    td.innerText = value;
    if (value!==""){
      let button = document.createElement('button');
      let icon = document.createElement('i');
      button.className = 'annotation-button';
      icon.className="pi pi-file-edit annotate-icon";
      button.appendChild(icon);
      button.addEventListener("click", () => annotate(td, row, col, prop, value), false);
      td.appendChild(button);
    }
    
    return td;
  }

  const afterSelectionEnd = (row, col, row2, col2) => {
    let hotTable = hotTableComponent.value.hotInstance;
    let cellValues = [];
    for (let r = Math.min(row, row2); r <= Math.max(row, row2); r++) {
      for (let c = Math.min(col, col2); c <= Math.max(col, col2); c++) {
        cellValues.push(hotTable.getDataAtCell(r, c));
      }
    }
    let primaryValue = hotTable.getDataAtCell(row, col);
    emit('cell-selection', row, col, row2, col2, primaryValue, cellValues);
  }

  onBeforeMount(() => {
    hotSettings.value["data"] = props.extractedData;
    hotSettings.value['renderer'] = renderCell;
  });

  onMounted(() => {
    let hotTable = hotTableComponent.value.hotInstance;
    hotTable.addHook("afterSelectionEnd", afterSelectionEnd);
  });
</script>