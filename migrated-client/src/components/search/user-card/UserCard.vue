<template>
    
<div class="user-card">
  <div class="user-card-user-img">
    <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
     src="soon">
  </div>
  <div class="user-card-details">
    <h3>User username</h3>
    
    <p style="color: gray">User Job</p>
    
    <div class="user-buttons">
      <button class="view-profile-btn">View Profile</button>
    </div>
    
  </div>
</div>

</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'UserCard'
    })
</script>

<style src="./UserCard.css"></style>