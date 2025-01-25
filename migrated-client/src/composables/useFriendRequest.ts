import { usePost } from "./usePost";
import { apiService } from "@/api/ApiService";

export default {
  setup() {
    const acceptOrDeny = async ({ type, requestId }) => {
      const endpoint = type === "accept" ? "/users/friendRequest/accept" : "/users/friendRequest/deny";

      const { mutate } = usePost({
        serviceFunc: (data) => apiService.post(endpoint, data),
        successFunc: () => window.location.reload(),
        withError: true,
        withLoading: true,
      });

      await mutate({ requestId });
    };

    return { acceptOrDeny };
  },
};
