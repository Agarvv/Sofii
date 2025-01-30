<template>
  <button @click="accept" class="f-button-accept">
    Accept
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePost } from '@/composables/usePost'
import { apiService } from '@/api/ApiService'


export default defineComponent({
  name: 'AcceptRequest',
  props: {
    requestId: {
      type: Number,
      required: true 
    }
  },
  setup(props) {
    const { mutate } = usePost({
      serviceFunc: (data: { requestId: number }) => apiService.post('/users/friendRequest/accept', data),
      successFunc: () => window.location.reload(),
      withError: true,
      withLoading: true,
    });

    const accept = async () => {
      await mutate({
        requestId: props.requestId
      })
    };

    return { accept };
  }
});
</script>
