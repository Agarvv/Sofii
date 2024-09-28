<template>
  <div>
   
   <div class="loading-div">
     <p>{{message}}</p>
   </div>
  
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    message: "Please Wait..."
  }
}
</script>

<style scoped>
.loading-div {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}
</style>