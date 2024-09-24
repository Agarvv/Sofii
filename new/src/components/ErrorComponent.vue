<template>
    <div>
    
       <div class="error_container">
           <p class="error">{{error}}</p>
       </div>
        
    </div>
</template>

<script>
    export default {
        name: 'ErrorComponent',
        props: {
            error: ""
        }
    }
</script>

<style scoped>
    .error_container {
      width: 100%;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 500;
      background: red;
    }
</style>