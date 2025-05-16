import { useQuery } from "@tanstack/react-query";
import getUsers from "../service/userFilter";

interface User {
  id: number;
  name: string;
}

export const UserTable = () => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) {
    console.error(error);
    return <div>خطا در بارگذاری داده‌ها: {error.message}</div>;
  }

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
