import { useQuery } from '@tanstack/vue-query'
import { apiStatusStore } from '@/store/apiStatusStore'

interface UseGetOptions<T> {
  serviceFunc: () => Promise<T>,
  successFunc?: (data: any) => void,  
  withError: boolean,
}

export function useGet<T>({ serviceFunc, successFunc, withError }: UseGetOptions<T>) {
  const apiStore = apiStatusStore() 
  console.log("use get called")
  
  const { data, error, isLoading, isError, isSuccess } = useQuery<T>({
    queryKey: ['data'],   
    queryFn: serviceFunc, 
  })

  console.log("data ( Vue Query):", data)
  console.log("error:", error)
  
  if (isLoading) {
    console.log("Loading")
    return { data: null }
  }

  if (isSuccess && data) {
    console.log("Data dispo:", data)  
    const realData = data  

    if (realData) {
      successFunc ? successFunc(realData) : console.log('Get Succeeded!', realData)
    } else {
      console.log("data is empty or it didnt charge ok")
    }
  }

  if (isError && withError) {
    console.log("ERROR:", error)
    apiStore.setError('Something Went Wrong... :c')
  }

  return { data }
}
