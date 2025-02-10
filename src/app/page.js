"use client";

import Banner from "@/components/Home/Banner/Banner";
import Feedback from "@/components/Home/Feedback/Feedback";
import PopularServices from "@/components/Home/PopularServices/PopularServices";
import WantContractor from "@/components/Home/WantContractor/WantContractor";
import WhatPeared from "@/components/Home/WhatPeared/WhatPeared";
import WhyPeared from "@/components/Home/WhyPeared/WhyPeared";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularServices />
      <WhatPeared />
      <WhyPeared />
      <Feedback />
      <WantContractor />
    </>
  );
}
