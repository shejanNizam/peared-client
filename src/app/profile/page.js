"use client";

import ProviderProfile from "@/components/profile/my-profile/ProviderProfile";
import UserProfile from "@/components/profile/my-profile/UserProfile";
import { useSelector } from "react-redux";

export default function ProfileHomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.role === "provider" ? (
        <>
          <ProviderProfile />
        </>
      ) : (
        <>
          <UserProfile />
        </>
      )}
    </>
  );
}
