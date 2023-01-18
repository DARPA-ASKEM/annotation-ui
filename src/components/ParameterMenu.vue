<template>

<Sidebar 
     v-model:visible="openMenu"
     position=left
>
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
</Sidebar>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import Sidebar from 'primevue/sidebar';

export default defineComponent({
	name: 'ParameterMenu',
        props: ["appendParameter", "visibleMenu"],
        setup (props, { emit }) {
                const formData = ref({
                        "name": "",
                        "type": "",
                        "curie": "",
                        "defaultValue": "",
                        "stateVariable": true,
                });

                var openMenu = computed({
                        get: () => props.visibleMenu,
                        set: sidebarValue => emit('update:visibleMenu', sidebarValue),
                });

                const submit = () => {
                  props.appendParameter(formData.value);
                  openMenu = false;
                };

                return { formData, submit, openMenu };
        },
        components: {
          Sidebar
        },
})
</script>

