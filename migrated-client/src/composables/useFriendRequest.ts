import { usePost } from "./usePost";
import { apiService } from "@/api/ApiService";

export default {
  setup() {
    interface Options {
      type: string,
      requestId: number
    }
    const acceptOrDeny = async ({ type, requestId }: Options) => {
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
  },
};
