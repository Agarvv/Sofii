<template>
  <div @click="goToNTarget" class="notification-card">
    <div class="profile">
        <img :src="notification.sender.profilePicture" class="profile-pic">
    </div>
    <div class="notification-content">
        <h4 class="username">{{ notification.sender.username }}</h4>
        <p class="notification-text">{{ notification.notification }}</p>
        <p class="date">Now</p>
    </div>

    <div @click.stop="hideNotification" class="notification-close">
      <i class="fa fa-close"></i>
    </div>
  </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NotificationCard',
  props: {
    notification: {
      type: Object as () => any,
      required: true 
    }
  },
  setup(props, { emit }) {
    const router = useRouter();

    const goToNTarget = () => {
      const routes: Record<string, any> = {
        POST_LIKED: { name: "post", params: { id: props.notification.type_id } },
        FRIEND_REQUEST: { name: "friends" },
        NEW_FOLLOWER: { name: "profile", params: { id: props.notification.type_id } },
        ACCEPTED_FRIEND_REQUEST: { name: "friends" },
        CHAT_MESSAGE: { name: "chat", params: { id: props.notification.type_id } }
      };

      const route = routes[props.notification.notification_type];

      if (route) {
        router.push(route);
      } else {
        console.warn("Unknown notification type:", props.notification.notification_type);
      }
    };

    const hideNotification = () => {
      emit("hideNotification");
    };

    return {
      goToNTarget,
      hideNotification
    };
  }
});
</script>

<style scoped src="./NotificationCard.css"></style>