"use client";

import { useGetTermsAndConditionsQuery } from "@/redux/features/settings/settingsApi";
import { Spin } from "antd";

export default function TermsOfUse() {
  const { data, isLoading } = useGetTermsAndConditionsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className=" text-center bg-white shadow-xl min-h-screen p-4 md:p-12 m-4 md:mx-64 md:my-12 ">
        <h3 className=" text-2xl md:text-4xl font-bold text-primary mb-12">
          Terms Of Use
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
