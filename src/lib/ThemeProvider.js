// lib/ThemeProvider.jsx

"use client"; // Required for client-side rendering

import { mainTheme } from "@/components/utils/antTheme";
import { useGetUserDataQuery } from "@/redux/features/userApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design's CSS here
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { data, isLoading } = useGetUserDataQuery(undefined);
  const dispatch = useDispatch();

  // console.log(data?.data, isLoading);

  useEffect(() => {
    dispatch(
      setCredentials({
        user: data?.data,
        token: "",
      })
    );
  }, [data?.data, dispatch]);

  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
