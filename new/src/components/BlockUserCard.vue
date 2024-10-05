<template>
<div> 
  <div class="block-user">
    
 <div @click="blockUser" class="block-card">
<font-awesome-icon :icon="isBlocked ? 'unlock' : 'lock'"/>
  <p>{{isBlocked ? 'Unblock User' : 'Block User'}}</p>
  
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
.block-card {
  box-shadow: 5px 5px 10px rgba(0, 0, 0);
  padding: 15px;
  width: 150px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  cursor: pointer;
}
</style>