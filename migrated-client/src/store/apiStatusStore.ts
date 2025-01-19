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
      this.successMessage = null; 
      this.errorMessage = null; 
    },
    setSuccess(successMessage: string) {
      this.successMessage = successMessage; 
      this.isLoading = false,
      this.errorMessage = null
    },
    setError(errorMessage: string) {
      this.errorMessage = errorMessage
      this.successMessage = null,
      this.isLoading = false; 
    }
  }
})
