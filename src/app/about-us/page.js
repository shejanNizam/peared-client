"use client";

import { useGetAboutUsQuery } from "@/redux/features/settings/settingsApi";
import { Spin } from "antd";

export default function AboutUs() {
  const { data, isLoading } = useGetAboutUsQuery();
  console.log(data?.data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="text-center bg-white shadow-xl min-h-screen p-4 md:p-8 lg:p-12 m-4 md:mx-8 lg:mx-16 xl:mx-32 md:my-8 lg:my-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 md:mb-12">
          About Us
        </h3>
        <div>
          {/* Render the HTML content from the API */}
          {data?.data[0]?.description && (
            <div
              className="p-6 rounded-lg shadow-md mb-8 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data?.data[0]?.description }}
            />
          )}
        </div>
      </div>
    </>
  );
}
