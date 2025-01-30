<template>
    <form @submit.prevent="handleSubmit">
          <div class="comment-answer">
      <div class="comment-answer-input">
        <input v-model="answerValue" placeholder="Answer To This Comment" />
      </div>
      <button type="submit" class="comment-answer-send-button">
        <i class="fa fa-paper-plane"></i>
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
  name: 'AnswerToComment',
  props: {
    commentId: {
      type: Number,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    interface AnswerValues {
      postId: number;
      commentId: number;
      answerValue: string;
    }

    const validationSchema = yup.object({
      answerValue: yup.string().required('Answer is required'),
    });

    const { handleSubmit, errors } = useForm<AnswerValues>({
      validationSchema,
    });

    const { value: answerValue } = useField('answerValue');
    const { postId, commentId } = toRefs(props);

    const { mutate } = usePost<AnswerValues>({
      serviceFunc: (data: AnswerValues) => apiService.post('/posts/comments/answer', data),
      successFunc: () => window.location.reload(),
      withError: true,
      withLoading: true,
    });

    const onSubmit = async (values: AnswerValues) => {
      const answerData = {
        ...values,
        postId: postId.value,
        commentId: commentId.value,
      };
      console.log('Answer submitted', answerData);
      await mutate(answerData);
    };

    return {
      answerValue,
      errors,
      handleSubmit: handleSubmit(onSubmit),
    };
  },
});
</script>

<style scoped src="./AnswerToComment.css"></style>