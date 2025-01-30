<template>
  <button @click="deny" class="f-button-deny">Deny</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePost } from '@/composables/usePost';
import { apiService } from '@/api/ApiService';

export default defineComponent({
name: 'DenyRequest',
props: {
  requestId: {
    type: Number,
    required: true
  }
},
setup(props) {
  const { mutate } = usePost({
    serviceFunc: (data: { requestId: number }) => apiService.post('/users/friendRequest/deny', data),
    successFunc: () => console.log("success"),
    withError: true,
    withLoading: true,
  });

  const deny = async () => {
    await mutate({
      requestId: props.requestId
    });
  };

  return { deny };
}
});
</script>
