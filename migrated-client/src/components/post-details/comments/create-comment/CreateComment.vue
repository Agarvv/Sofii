<template>
    <form @submit.prevent="handleSubmit">
          <div class="upload-comment">
      <div class="input">
        <input v-model="commentValue" type="text" placeholder="Upload A Comment" />
      </div>
      <button type="submit" class="send-button">
        <div class="send-button">
          <i class="fa fa-paper-plane"></i>
        </div>
      </button>
       </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { usePost } from '@/composables/usePost';
import { apiService } from '@/api/ApiService';

export default defineComponent({
  name: 'CreateComment',
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    interface CommentValues {
      postId: number;
      commentValue: string;
    }

    const validationSchema = yup.object({
      postId: yup.number(),
      commentValue: yup.string().required('Comment is required'),
    });

    const { handleSubmit, errors } = useForm<CommentValues>({
      validationSchema,
    });

    const { value: commentValue } = useField('commentValue');
    const { postId } = toRefs(props);

    const { mutate } = usePost<CommentValues>({
      serviceFunc: (data: CommentValues) => apiService.post('/posts/comments', data),
      successFunc: () => window.location.reload(),
      withError: true,
      withLoading: true,
    });

    const onSubmit = async (values: CommentValues) => {
      const commentData = {
        ...values,
        postId: postId.value,  
       };
         console.log('Comment submitted', commentData);
         await mutate(commentData);
     };

    return {
      commentValue,
      errors,
      handleSubmit: handleSubmit(onSubmit), 
    };
  },
});
</script>

<style scoped src="./CreateComment.css"></style>