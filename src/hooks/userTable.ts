import { useQuery } from "@tanstack/react-query";
import getUsers from "../service/userFilter";

export const UserTable = () => {
  const pageIndex = 1;
  const pageSize = 20;
  const search = "";

  return useQuery({
    queryKey: ["getUsers", pageIndex, pageSize, search],
    queryFn: () => getUsers({ PageIndex: pageIndex, PageSize: pageSize, Search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
