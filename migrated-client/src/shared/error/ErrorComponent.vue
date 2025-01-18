<template>
    <div class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'; 
  export default defineComponent({
      name: 'ErrorComponent',
      props: {
         errorMessage: String 
      }
  })
  </script>
  
  <style scoped lang="css">
  .error {
    padding: 25px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%; 
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(163, 6, 6); 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 999;
  }
  </style>