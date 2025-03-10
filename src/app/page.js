"use client";
import BottomBar from "@/components/BottomBar/BottomBar";
import Banner from "@/components/Home/Banner/Banner";
import Feedback from "@/components/Home/Feedback/Feedback";
import PopularServices from "@/components/Home/PopularServices/PopularServices";
import WantContractor from "@/components/Home/WantContractor/WantContractor";
import WhatPeared from "@/components/Home/WhatPeared/WhatPeared";
import WhyPeared from "@/components/Home/WhyPeared/WhyPeared";
import { useSelector } from "react-redux";

export default function Home() {
  // const { user } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Banner />
      <PopularServices />
      <WhatPeared />
      <WhyPeared />
      <Feedback />
      <WantContractor />
      {user && <BottomBar />}
    </>
  );
}
