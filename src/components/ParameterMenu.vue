<template>
<div>
        <h3>Annotating parameter:</h3>
        <div>
                <div>Parameter name</div>
                <input />
        </div>
        <div>
                <div>Default value</div>
                <input />
        </div>
        <div>
                <div>Associated CURIE</div>
                <input />
        </div>
        <div>
                <div>Is this a state variable?</div>
                <input type="radio" id="confirm" :value="true" v-model="isState" />
                <label for="confirm">Yes</label>
                <input type="radio" id="deny" :value="false" v-model="isState" />
                <label for="deny">No</label>
        </div>
        <button>Add to Parameter List</button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'ParameterMenu',
        setup () {
                const isState = ref(true);

                return { isState };
        }
}
</script>

