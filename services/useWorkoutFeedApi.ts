import useApiClient from "@/hooks/useApiClient";
import { IWorkout } from "@/types/DTO/workot-feed";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useWorkoutFeedApi = () => {
  const queryClient = useQueryClient();
  const { apiClient } = useApiClient();

  return {
    useGetWorkouts: () => {
      const context = useQuery(
        {
          queryKey: ["workout-feed"],
          queryFn: () => apiClient().get("workout-feed"),
          enabled: true,
        },
        queryClient,
      );
      return {
        ...context,
        data: context.data?.data.data as IWorkout[],
      };
    },
  };
};

export default useWorkoutFeedApi;
