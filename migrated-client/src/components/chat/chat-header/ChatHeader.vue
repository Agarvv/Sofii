<template>
  <div v-if="userToDisplayInfo" class="main-header">
    <div class="user-details">
      <div class="user-img">
        <img
          style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
          :src="userToDisplayInfo.profilePicture"
          class="profile-img"
        />
      </div>
      <div class="user-username">
        <h4>{{ userToDisplayInfo.username }}</h4>
        <p v-if="isUserTyping">{{ userToDisplayInfo.username }} Is Typing...</p>
        <p
          v-if="!isUserTyping && userToDisplayInfo.active"
          style="color: green;"
          class="status"
        >
          Online
        </p>
        <p v-if="!isUserTyping && !userToDisplayInfo.active" style="color: gray">
          Offline
        </p>
      </div>
    </div>
    <div class="header-interact"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { UserToDisplayInfo } from '@/types/chats/UserToDisplayInfo';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
  name: 'ChatHeader',
  props: {
    userToDisplayInfo: {
      type: Object as () => UserToDisplayInfo,
      required: true,
    },
  },
  setup(props) {
    const { socket } = useSocket();
    const isUserTyping = ref<boolean>(false);

    onMounted(() => {
      socket.on('typing', () => {
        isUserTyping.value = true;
      });

      socket.on('stopTyping', () => {
        isUserTyping.value = false;
      });
    });

    return {
      isUserTyping
    };
  },
});
</script>