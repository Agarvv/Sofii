<template>
<div> 
  <div class="block-user">
    <div class="block-user-header">
      <font-awesome-icon :icon="close"/>
    </div>
    
    <div @click="blockUser" class="block-user-card">
      <p>{{ isBlocked ? 'Unblock User' : 'Block User' }}</p>
     
      <font-awesome-icon :icon="isBlocked ? 'fas fa-unlock' : 'fas fa-lock'" />
    </div>
    
  </div>
</div> 
</template>

<script>
import { blockUser } from '../services/usersService' 

export default {
    name: 'BlockUserCard',
    props: {
        user: {}
    },
    data() {
        return {
            isBlocked: this.user.isBlocked
        }
    },
    methods: {
        async blockUser() {
            try {
                const data = await blockUser(this.user.id)
                if (data.blocked && !data.unblocked) {
                    this.isBlocked = true; 
                } else if (data.unblocked && !data.blocked) {
                    this.isBlocked = false; 
                }
            } catch(e) {
                console.log('Something Went Wrong..', e);
                return; 
            }
        }
    }
}
</script>

<style scoped>
    .block-user {
    width: 200px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    overflow: hidden;
    transition: transform 0.2s;
}


.block-user-header {
    background-color: #ff4d4d;
    color: white;
    padding: 10px;
    text-align: right;
}

.close-button {
    cursor: pointer;
    font-weight: bold;
}

.block-user-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: .4s;
    text-align: center;
}

.block-user-card:hover {
  background: #CBCBCE;
}

.block-user-card p {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.lock-icon {
    font-size: 30px;
}
</style>