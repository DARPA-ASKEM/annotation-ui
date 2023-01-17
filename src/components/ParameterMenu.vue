<template>
<div>
        <h3>Annotating parameter:</h3>
        <div>
                <div>Parameter name</div>
                <input type="text" v-model="formData.name" />
        </div>
        <div>
                <div>Type</div>
                <input type="text" v-model="formData.type" />
        </div>
        <div>
                <div>Default value</div>
                <input type="text" v-model="formData.defaultValue" />
        </div>
        <div>
                <div>Associated CURIE</div>
                <input type="text" v-model="formData.curie" />
        </div>
        <div>
                <div>Is this a state variable?</div>
                <input type="radio" id="confirm" :value="true" v-model="formData.stateVariable" />
                <label for="confirm">Yes</label>
                <input type="radio" id="deny" :value="false" v-model="formData.stateVariable" />
                <label for="deny">No</label>
        </div>
        <button @click="submit">Add to Parameter List</button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'ParameterMenu',
        props: ["appendParameter"],
        setup (props) {
                const formData = ref({
                        "name": "",
                        "type": "",
                        "curie": "",
                        "defaultValue": "",
                        "stateVariable": true,
                });

                const submit = () => props.appendParameter(formData.value);

                return { formData, submit };
        }
}
</script>

