<template>
    <button @click="deny" class="f-button-deny">Deny</button>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import useFriendRequest from '@/composables/useFriendRequest';
  
  export default defineComponent({
    name: 'DenyRequest',
    props: {
      requestId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const { acceptOrDeny } = useFriendRequest();  
  
      const deny = async () => {
        await acceptOrDeny({
          type: 'deny',
          requestId: props.requestId
        });
      };
  
      return { deny };
    }
  });
  </script>
  