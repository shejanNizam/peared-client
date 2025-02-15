"use client";

import ProviderProfile from "@/components/profile/my-profile/ProviderProfile";
import UserProfile from "@/components/profile/my-profile/UserProfile";
import { useGetUserDataQuery } from "@/redux/features/userApi";
import { useSelector } from "react-redux";

export default function ProfileHomePage() {
  // const { data } = useGetUserDataQuery();
  const { user } = useSelector((state) => state.auth);
  // const user = data?.data;
  // console.log(user);

  return (
    <div>
      {user?.role === "provider" ? (
        <>
          <ProviderProfile />
        </>
      ) : (
        <>
          <UserProfile />
        </>
      )}
      {/* {user?.role === "user" && <UserProfile />}
      {user?.role === "provider" && <ProviderProfile />} */}
    </div>
  );
}
