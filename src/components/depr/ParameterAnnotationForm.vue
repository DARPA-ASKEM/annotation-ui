<template>
    <div>
        <label for="param_name">Name</label>

        <InputText class="spacer" type="text" v-model="param_name" />
        <label for="param_value">Value</label>
        <Textarea class="spacer matchInput" v-model="parameter_value" :value="parameter_value" :autoResize="true" rows="3" cols="30" />
        <Dropdown class="spacer matchInput" v-model="selectedType" :options="data_types" optionLabel="name" optionValue="name" placeholder="Select a Data Type" />
        <br/>
        <RadioButton name="state_variable" value="false" v-model="state_variable" />
        <br/>
        <Button @click="submit">Submit</Button>

    </div>
    </template>
    
    <script>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button'
    import RadioButton from 'primevue/radiobutton';
    import Dropdown from 'primevue/dropdown'
    
    export default {
        name: 'ParameterAnnotationForm',
        props:['selectedValue'],
        data() {
            return {
              state_variable:"false",
              selectedType:null,
              data_types: [{name: 'int'}, {name:"string"},{name:"boolean"},{name:"float"}],
              param_name:null,
              parameter_value:null,
            }
          },
        components: {
            InputText,
            Button,
            Dropdown,
            RadioButton
        },
        methods:{
            submit(){
                console.log(this.parameter_value)
                console.log(this.param_name)
                console.log(this.state_variable)

            }
        },
        beforeMount(){
            console.log(this.selectedValue)
            this.parameter_value=this.selectedValue
        }
    }
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
    