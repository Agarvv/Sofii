<template>
   <div class="upload-comment">
      <form @submit.prevent="handleSubmit(onSubmit)"> 
            <div class="input">
              <input v-model="commentValue" type="text" placeholder="Upload A Comment">
            </div>
            
            <button type="submit" class="send-button">
               <div class="send-button">
                  <i class="fa fa-paper-plane"></i>
               </div>
            </button>
      </form>
   </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import { useForm, useField } from 'vee-validate';
    import * as yup from 'yup';
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';

    export default defineComponent({
        name: 'CreateComment',
        props: {
            postId:  {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            interface CommentValues {
                commentValue: string 
            }
            
            const validationSchema = yup.object({
                commentValue: yup.string().required("Comment is required")
            });
            
            const { handleSubmit, errors } = useForm<CommentValues>({
                  validationSchema,
            });
            
            const { value: commentValue } = useField('commentValue');

            const { mutate } = usePost<CommentValues>({
               serviceFunc: (data: CommentValues) => apiService.post('/posts/comments', { ...data, postId: props.postId }),
               successFunc: () => window.location.reload(),
               withError: true,
               withLoading: true,
            });
            
            const onSubmit = async (values: CommentValues) => {
                console.log("Comment submitted with postId:", props.postId);
                await mutate(values); 
            };
            
            return { 
                commentValue,
                handleSubmit,
                onSubmit,
                errors 
            };
        }
    })
</script>

<style scoped src="./CreateComment.css"></style>