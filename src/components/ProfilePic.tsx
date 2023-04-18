import { useQuery } from "@tanstack/react-query";
import { User, getUser } from "../api";

export default function ProfilePic({ username }: { username: string }) {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery<User, Error>({
    queryKey: [username],
    queryFn: async () => {
      return await getUser(username);
    },
  });

  return <img src={`${user?.avatar_url}`} alt="Profile Pic" height={"40px"} />;
}
