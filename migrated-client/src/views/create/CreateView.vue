<template>
     <CreateForm />
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import CreateForm from '@/components/create/CreateForm.vue';
    
    export default defineComponent({
        name: 'CreateView',
        components: {
            CreateForm 
        }
    })
</script>