<template>

<Sidebar 
     v-model:visible="visibleMenu"
     position=right
>
<div>
        <h3>Annotating parameter:</h3>

        <label for="param-name">Name</label>
        <InputText id="param-name" class="spacer" 
                   type="text" v-model="formData.name" />

        <label for="param-value">Default Value</label>
        <InputText id="param-value" class="spacer" 
                   type="text" v-model="formData.defaultValue" />

        <Dropdown class="spacer matchInput" v-model="formData.type" 
                  :options="typeOptions" optionLabel="name" optionValue="name" 
                  placeholder="Select Type" />

        <br><label for="state-variable">Is this a State Variable?</label>
        <div id="state-variable" >
        <div class="field-radiobutton">
          <RadioButton inputId="yes" :value="true" v-model="formData.stateVariable" />
          <label for="yes">Yes</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton inputId="no" :value="false" v-model="formData.stateVariable" />
          <label for="no">No</label>
        </div>
        </div>

        <label for="param-curie">Associated CURIE</label>
        <InputText id="param-value" class="spacer" type="text" v-model="formData.curie" />
        <Button @click="submit">Add to Parameter List</Button>

</div>

</Sidebar>
</template>

<script setup>
import { ref, computed ,watch} from 'vue';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown'

const emit = defineEmits(['update:visibleMenu']);
const props = defineProps(["appendParameter", "visibleMenu", "selectedValue"]);


const typeOptions = ref([
  {name: 'int'}, {name:"string"},{name:"boolean"},{name:"float"}
]);



const selectedValue = computed({
        get: () => props.selectedValue,
        set: selected_v => emit('update:selectedValue', selected_v),
});
const formDefaults = {
        "name": "",
        "type": "",
        "curie": "",
        "defaultValue": selectedValue,
        "stateVariable": true,
};
const visibleMenu = computed({
        get: () => props.visibleMenu,
        set: sidebarValue => emit('update:visibleMenu', sidebarValue),
});

const formData = ref({...formDefaults});

const submit = () => {
  props.appendParameter(formData.value);
  emit('update:visibleMenu', false);
  formData.value = {...formDefaults};
};

</script>


<style scoped>
.spacer{
    margin:12px;
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
