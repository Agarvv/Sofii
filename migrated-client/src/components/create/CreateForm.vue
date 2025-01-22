<template>
  <div class="container">
    <div class="create-container">
      <form @submit.prevent="submitForm">
        <div class="f-column">
          <div class="fc-inp">
            <input v-model="description" placeholder="What's Up?" />
            <span v-if="errors.description" class="val-error">{{ errors.description }}</span>
          </div>
        </div>

        <div class="demostration-content" v-if="picture">
          <img
            :src="picture"
            style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px;"
          />
        </div>

        <div class="s-column">
          <PostImage @imageUploaded="setPicture" />
          <button type="submit">
            <div class="sce-three">
              <i class="fa fa-paper-plane"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostImage from './post-image/PostImage.vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { usePost } from '@/composables/usePost';
import { apiService } from '@/api/ApiService';

export default defineComponent({
  name: 'CreateForm',
  components: { PostImage },
  setup() {
    interface CreatePostFormValues {
      description: string;
      picture: string;
    }

    const validationSchema = yup.object({
      description: yup.string().required('Description is required'),
      picture: yup
        .string()
        .url('Image must be a valid URL')
        .required('Image is required!'),
    });

    const { handleSubmit, errors } = useForm<CreatePostFormValues>({
      validationSchema,
    });

    const { value: description } = useField('description');
    const { value: picture } = useField<string | undefined>('picture');

    const { mutate } = usePost<CreatePostFormValues>({
      serviceFunc: (data: CreatePostFormValues) =>
        apiService.post('/posts', data),
      withError: true,
      withLoading: true,
      successMessage: 'Post Created!',
    });

    const onSubmit = async (values: CreatePostFormValues) => {
      try {
        console.log('Form submitted:', values);
        await mutate(values);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    };

    const setPicture = (imageUrl: string) => {
      picture.value = imageUrl;
    };

    return { submitForm: handleSubmit(onSubmit), description, errors, picture, setPicture };
  },
});
</script>

<style scoped src="./CreateForm.css"></style>
