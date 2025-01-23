import { apiService } from '@/api/ApiService';
import { usePost } from '@/composables/usePost';


interface ProfileDataChangeValues {
    field: string,
    value: string 
}

export async function useProfileDataChange(data: ProfileDataChangeValues) {
    const { mutate } = usePost<ProfileDataChangeValues>({
        
        serviceFunc: (data: ProfileDataChangeValues) => apiService.post('/profile/set', data),
        
        successFunc: () => window.location.reload(),
        
        withError: true,
        
        withLoading: true 
    })
    
    await mutate(data); 
}