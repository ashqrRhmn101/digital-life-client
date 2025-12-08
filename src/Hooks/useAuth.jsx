import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useAuth = () => {
  const {
    user,
    loading,
    signOutUser,
    registerUser,
    signInUser,
    googleSignIn,
    userProfile,
  } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  // MongoDB role + isPremium
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
    user,
    loading: loading || userLoading,
    signOutUser,
    registerUser,
    signInUser,
    googleSignIn,
    userProfile,
    currentUser,
    isAdmin: currentUser?.role === "admin",
    isPremium: currentUser?.isPremium || false,
    refetchUser,
  };
};

export default useAuth;
