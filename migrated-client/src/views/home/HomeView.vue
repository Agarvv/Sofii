<template>
    <div class="layout">
        <div class="header">
          <HeaderComponent /> 
        </div> 
        
        <div class="aside">
          <AsideComponent /> 
        </div>
        
        <main class="main">
            
        </main>
        
        <div class="right-aside">
           <UsersMayLike /> 
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import HeaderComponent from '@/shared/header/HeaderComponent.vue';
    import AsideComponent from '@/shared/aside/AsideComponent.vue'
    import UsersMayLike from './users-may-like/UsersMayLike.vue'
    
    export default defineComponent({
        name: 'HomeView',
        components: {
            HeaderComponent,
            AsideComponent,
            UsersMayLike
        }
    })
</script>

<style scoped src="./HomeView.css"></style>