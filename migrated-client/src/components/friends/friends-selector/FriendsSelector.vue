<template>
  <div class="responsive-main-header">
    <div @click="toggleSelectedOption('friends')" class="rmh-only-friends">
      <i class="fa fa-user-friends"></i>
      <h4>Only My Friends</h4>
    </div>
    <div @click="toggleSelectedOption('requests')" class="rmh-pending-requests">
      <i class="fa fa-user-plus"></i>
      <h4>Pending requests</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FriendsSelector',
  emits: ['changeOption'],
  setup(_, { emit }) {
    const toggleSelectedOption = (option: string) => {
      emit('changeOption', option);
    };

    return { toggleSelectedOption };
  },
});
</script>