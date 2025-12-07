import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const useAuth = () => {
  const { user, loading, logOutUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // role + isPremium
  const {
    data: currentUser = {},
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  return {
    // firebase user (email, photoURL, displayName)
    user,
    loading: loading || userLoading,
    logOutUser,
    // MongoDB user..
    currentUser,
    isAdmin: currentUser?.role === "admin",
    isPremium: currentUser?.isPremium || false,
    refetchUser,
  };
};

export default useAuth;
