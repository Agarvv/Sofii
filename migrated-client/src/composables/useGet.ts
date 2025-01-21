import { useQuery } from '@tanstack/vue-query'
import { apiStatusStore } from '@/store/apiStatusStore'

interface UseGetOptions<T> {
  serviceFunc: () => Promise<T>,
  successFunc?: (data: T) => void,  
  withError: boolean,
}

export function useGet<T>({ serviceFunc, successFunc, withError }: UseGetOptions<T>) {
  const apiStore = apiStatusStore() 
  console.log("use get called")
  
  const { data, error } = useQuery<T>({
    queryKey: ['data'],   
    queryFn: serviceFunc, 
  })

  console.log("datas", data)  

  if (data?.value) {  
    successFunc ? successFunc(data.value) : console.log('Get Succeeded!', data.value)
  }

  if (error?.value && withError) { 
    console.log("ERROR", error.value) 
    apiStore.setError('Something Went Wrong... :c') 
  }

  return { data }
}
