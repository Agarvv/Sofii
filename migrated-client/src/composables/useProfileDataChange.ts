
import { apiService } from '@/api/ApiService';
import { usePost } from '@/composables/usePost';

interface ProfileDataChangeValues {
    field: string;
    value: string;
}

export default function useProfileDataChange() {
    const { mutate } = usePost<ProfileDataChangeValues>({
        serviceFunc: (data: ProfileDataChangeValues) => apiService.post('/profile/set', data),
        successFunc: () => window.location.reload(),
        withError: true,
        withLoading: true,
    });

    const changeProfileData = async (data: ProfileDataChangeValues) => {
        await mutate(data);
    };

    return {
        changeProfileData,
    };
}