<template>
  <div  @click="goToNTarget(notification.type_id)" class="notification-card">
    <div class="profile">
        <img :src="'http://localhost:3000/' + notification.targetUser.profilePicture" class="profile-pic">
    </div>
    <div class="notification-content">
        <h4 class="username">{{notification.targetUser.username}}</h4>
        <p class="notification-text">{{notification.notification}}</p>
        <p class="date">Now</p>
    </div>
    <!-- Asegúrate de que el @click del botón de cerrar no se propague -->
    <div @click.stop="hideNotification" class="notification-close">
      <font-awesome-icon icon="close"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationCard',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToNTarget(c_id) {
      let route = '';
      switch (this.notification.type) {
        case "CREATED_POST":
        case "POST_LIKED":
        case "POST_COMMENT":
          route = `/post/${c_id}`;
          break;
        case "VIDEO_LIKED":
        case "VIDEO_COMMENT":
          route = `/watch/${c_id}`;
          break;
        default:
          console.error("Unknown notification type");
          return;
      }
      this.$router.push(route);
    },
    hideNotification() {
      this.showNotification = false;
      // Emitimos un evento al padre para que sepa que la notificación fue cerrada
      this.$emit('notificationClosed');
    }
  },
  async mounted() {
    console.log('notification prop: ', this.notification);
  }
}
</script>


<style scoped>
    .notification-card {
    display: flex;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 400px;
    transition: transform 0.3s ease;
    width: 100%;
}

.notification-card:hover {
    transform: translateY(-5px);
}

.profile {
    margin-right: 15px;
}

.profile-pic {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.notification-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.username {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #333;
}

.notification-text {
    font-size: 14px;
    color: #666;
    margin: 8px 0;
}

.date {
    font-size: 12px;
    color: #aaa;
}

.notification-close {
    flex: 1;
    text-align: right;
}
</style>