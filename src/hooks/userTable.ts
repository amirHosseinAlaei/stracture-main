import { useQuery } from "@tanstack/react-query";
import getUsers from "../service/userFilter";

export const UserTable = () => {
  return useQuery({
    queryKey: ["getUserS"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};




