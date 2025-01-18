<template>
    <div class="loading">
      <p>Please Wait...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'; 
  export default defineComponent({
      name: 'LoadingComponent',
  })
  </script>
  
  <style scoped lang="css">
  .loading {
    padding: 25px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%; 
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 999;
  }
  </style>