import {ref} from 'vue';

export const storeCell = ref({
    selectedValue: "",
    setSelectedValue(value){
        this.selectedValue=value;
    }
});