<template>
    <div class="detail">
        <i v-if="icon" :class="icon"></i>
        <span>{{ detail }}</span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'ProfileDetail',
        props: {
            detail: {
                type: String,
                required: true 
            },
            icon: {
                type: String,
                required: false 
            }
        }
    })
</script>