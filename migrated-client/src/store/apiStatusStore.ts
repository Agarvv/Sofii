import { defineStore } from 'pinia'

interface ApiStatusStore {
  isLoading: boolean
  successMessage: string | null,
  errorMessage: string | null
}

export const apiStatusStore = defineStore('user', {
  state: (): ApiStatusStore => ({
    isLoading: false,
    successMessage: null,
    errorMessage: null
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading; 
    },
    setSuccess(successMessage: string) {
      this.successMessage = successMessage; 
    },
    setError(errorMessage: string) {
      this.errorMessage = errorMessage
    }
  }
})
