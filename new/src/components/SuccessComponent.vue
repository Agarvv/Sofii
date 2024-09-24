<template>
    <div>
    
       <div class="success_container">
           <p class="success">{{success}}</p>
       </div>
        
    </div>
</template>

<script>
    export default {
        name: 'SuccessComponent',
        props: {
            success: ""
        }
    }
</script>

<style scoped>
    .success_container {
      width: 100%;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 500;
      background: green;
    }
</style>