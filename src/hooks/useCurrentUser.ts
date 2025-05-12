import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../service/users";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes
    retry: 1,
  });
};
