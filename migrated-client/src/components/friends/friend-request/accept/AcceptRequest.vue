<template>
  <button @click="accept" class="f-button-accept">
    Accept
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import { useFriendRequest } from '@/composables/useFriendRequest';

export default defineComponent({
  name: 'AcceptRequest',
  props: {
    requestId: {
      type: Number,
      required: true 
    }
  },
  setup(props) {
    const { acceptOrDeny } = useFriendRequest(); 

    const accept = async () => {
      await acceptOrDeny({
        type: 'accept',
        requestId: props.requestId
      });
    };

    return { accept };
  }
});
</script>
