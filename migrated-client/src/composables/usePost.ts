import { useMutation } from '@tanstack/vue-query'
import { apiStatusStore } from '@/store/apiStatusStore'
import { ref } from 'vue'

interface UsePostOptions<T> {
  serviceFunc: (data: T) => Promise<any>,
  successFunc?: (response: any) => void,
  successMessage?: string,
  withError: boolean,
  withLoading: boolean
}

export function usePost<T>({
  serviceFunc,
  successFunc,
  successMessage,
  withError,
  withLoading
}: UsePostOptions<T>) {
  const apiStore = apiStatusStore()
  const responseData = ref<any>(null)

  const mutation = useMutation({
    mutationFn: (data: T) => serviceFunc(data),

    onMutate: () => {
      if (withLoading) {
        apiStore.setLoading(true)
      }
    },

    onError: (error: any) => {
      console.error(error)
      if (withError) {
        apiStore.setError("Something went wrong...")
      }
    },

    onSuccess: (response: any) => {
      responseData.value = response

      if (successFunc) {
        successFunc(response) 
      } else if (successMessage) {
        apiStore.setSuccess(successMessage)
      } else {
        console.log("Success.")
      }

      console.log("Response on onSuccess", response)
    },

    onSettled: () => {
      if (withLoading) {
        apiStore.setLoading(false)
      }
    }
  })

  return {
    mutate: mutation.mutate,
    data: responseData
  }
}
