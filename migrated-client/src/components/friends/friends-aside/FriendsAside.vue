<template>
 <aside>

<div class="aside-content">
  
  <div @click="toggleSelectedOption('friends')" class="only-friends">
 
    <i class="fa fa-user-friends"></i>
    <h4>Only My Friends</h4>

  </div>
   
  <div @click="toggleSelectedOption('requests')" class="pending-requests">
    <i class="fa fa-user-plus"></i>
    <h4>Pending requests</h4>
  </div>
  
</div>


</aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FriendsAside',
  emits: ['changeOption'],
  setup(_, { emit }) {
    const toggleSelectedOption = (option: string) => {
      emit('changeOption', option);
    };

    return { toggleSelectedOption };
  },
});
</script>