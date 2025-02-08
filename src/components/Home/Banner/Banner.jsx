"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg_img.png";
import ServiceAddBar from "./ServiceAddBar";

export default function Banner() {
  const { user } = useSelector((state) => state?.auth);

  return (
    <>
      <div
        className="h-auto lg:h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
        }}
      >
        <div className="flex justify-start lg:items-center h-full p-4 lg:pl-64">
          <div className="w-full lg:w-[800px] border border-primary/30 bg-secondary/50 rounded-lg p-4 lg:p-6">
            <h1 className="text-2xl lg:text-4xl font-semibold text-primary mb-4 text-center ">
              {user?.role === "provider"
                ? "Search your expertise in your areas"
                : "Search for pros in your area"}
            </h1>
            <p className="lg:text-lg mb-4 text-center text-black">
              {user?.role === "provider"
                ? "Here you can instantly find your Service in your area."
                : "Here you can instantly find Service Providers in your area."}
            </p>
            {/* Search Bar */}

            {/* {user?.role === "user" && } */}
            {user?.role === "provider" ? (
              <div className="text-center mx-auto my-2 w-1/2">
                <Link href={`/projects`}>
                  <span className=" text-white bg-primary px-4 py-2 flex justify-center items-center gap-2 ">
                    {" "}
                    Go to Projects <FaArrowRight />
                  </span>
                </Link>
              </div>
            ) : (
              <ServiceAddBar />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
