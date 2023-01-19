import {ref} from 'vue'

export const storeCell =ref({
    selectedValue:"start",
    setSelectedValue(value){
        this.selectedValue=value;
    }
})