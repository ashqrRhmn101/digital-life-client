import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://digital-life-server-six.vercel.app",
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();
  // const { signOutUser } = useAuth();

  // useEffect(() => {
  //   const reqIntercept = axiosSecure.interceptors.request.use((config) => {
  //     const token = localStorage.getItem("access-token");
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   });

  //   const resIntercept = axiosSecure.interceptors.response.use(
  //     (res) => res,
  //     async (error) => {
  //       if (error.response?.status === 401 || error.response?.status === 403) {
  //         await signOutUser();
  //         navigate("/login");
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosSecure.interceptors.request.eject(reqIntercept);
  //     axiosSecure.interceptors.response.eject(resIntercept);
  //   };
  // }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
