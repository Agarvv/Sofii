import { usePost } from '@/composables/usePost';
import { apiService } from "@/api/ApiService";

export default function useFriendRequest() {
  const acceptOrDeny = async ({ type, requestId }: { type: string; requestId: number }) => {
    const endpoint = type === "accept" ? "/users/friendRequest/accept" : "/users/friendRequest/deny";

    const { mutate } = usePost({
      serviceFunc: (data: { requestId: number }) => apiService.post(endpoint, data),
      successFunc: () => window.location.reload(),
      withError: true,
      withLoading: true,
    });

    await mutate({ requestId });
  };

  return { acceptOrDeny };
}
