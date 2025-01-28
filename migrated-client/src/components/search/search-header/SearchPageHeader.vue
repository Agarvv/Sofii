<template>
    <div>
        <header>
          <div class="logo">
            <h2>Sofii</h2>
          </div>
          <div class="search-input">
            <input v-model="searchQ" type="search" placeholder="Search..."/>
          </div>
          <div class="icons">
            <i class="fa-fa search" @click="search"></i>
            <i class="fa fa-filter" @click="toggleFilters"></i>
          </div>
        </header>
    </div>
    </template>
    

<script lang="ts">
   import { defineComponent, ref } from 'vue';

   export default defineComponent({
    name: 'SearchPageHeader',
    emits: ['toggleFilters'], 
    setup(_, { emit }) {
        const searchQ = ref<string>("")

        const toggleFilters = () => {
            emit("toggleFilters")
        }

        const search = () => {
            console.warn("soon"); 
        }

        return { toggleFilters, searchQ, search }
    }
   })
</script>

<style scoped src="./SearchPageHeader.css"></style>