<template>
    <div :class="getMessageClass()">
      <div class="msg_content">
        <div v-if="message.message_content.length > 0" class="message-user-img">
          <img :src="message.message_user.profilePicture" class="message-img" />
        </div>
        <p v-if="message.message_content.length > 0">
          {{ message.message_content }}
        </p>
        <i class="fa fa-check" :style="{ color: message.readed ? 'blue' : '' }"></i>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import { Message } from "@/types/chats/Message";
  
    export default defineComponent({
      name: "ChatMessage",
      props: {
        message: {
          type: Object as () => Message,
          required: true,
        },
      },
      setup(props) {
        const getMessageClass = () => {
          const userId = Number(localStorage.getItem("userId"));
          if (!userId) return ""; 
  
          const isOwn = props.message.message_user.id == userId;
          return isOwn ? "message user" : "message friend";
        };
  
        return {
          getMessageClass,
        };
      },
    });
  </script>
  
  <style src="./ChatMessage.css"></style>
  