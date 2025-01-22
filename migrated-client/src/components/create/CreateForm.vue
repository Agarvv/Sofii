<template>
    <div class="container">
      <div class="create-container">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="f-column">
            <div class="fc-inp">
              <input v-model="description" placeholder="What's Up?" />
              <p v-if="errors.description" class="error">{{ errors.description }}</p>
            </div>
          </div>
  
          <div class="demostration-content" v-if="image">
            <img
              :src="image"
              style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px;"
            />
          </div>
  
          <div class="s-column">
            <PostImage @imageUploaded="setImage" />
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
  import { defineComponent, ref } from 'vue';
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
        image: string;
      }
  
      // Validación del formulario
      const validationSchema = yup.object({
        description: yup.string().required('Description is required'),
        image: yup
          .string()
          .url('Image must be a valid URL')
          .required('Image is required!'),
      });
  
      const { handleSubmit, errors } = useForm<CreatePostFormValues>({
        validationSchema,
      });
  
      const { value: description } = useField('description');
      const { value: image } = useField<string | undefined>('image');
  
      const { mutate } = usePost<CreatePostFormValues>({
        serviceFunc: (data: CreatePostFormValues) =>
          apiService.post('/posts', data),
        withError: true,
        withLoading: true,
        successMessage: 'Post Created!',
      });
  
      const onSubmit = async (values: CreatePostFormValues) => {
        console.log('Form submitted:', values);
        await mutate(values);
      };

      const setImage = (imageUrl: string) => {
        image.value = imageUrl;
      };
  
      return { handleSubmit, onSubmit, description, errors, image, setImage };
    },
  });
  </script>
  
  <style scoped src="./CreateForm.css"></style>
  