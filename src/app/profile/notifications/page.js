"use client";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { Pagination, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notifications() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  // Pass currentPage to the query to fetch correct data

  const { data, isLoading } = useAllNotificationsQuery({
    page,
  });

  const handleBack = () => {
    router.back();
  };

  const paginatedData = data?.data?.notifications || [];
  const totalPage = data?.data?.pagination?.totalPage || 0;

  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-4 py-8 md:py-0">
      <div className="z-50 sticky top-20 flex justify-start gap-2 bg-primary rounded-t-md h-20 text-white py-8 pl-8 font-bold">
        <button onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <h2>All Notifications</h2>
      </div>

      <div className="ml-6">
        {paginatedData?.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No notifications available
          </div>
        ) : (
          paginatedData?.map((notification) => (
            <div
              key={notification._id}
              className="flex justify-start items-center gap-4 m-4"
            >
              <IoNotificationsOutline className="bg-[#E8EAEF] w-[40px] h-[40px] rounded-sm text-primary p-2" />
              <div>
                <p className="text-xl">{notification.message}</p>
                <p className="text-[#989898]">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* pagination */}
      <div className=" flex justify-center p-4">
        <Pagination
          defaultCurrent={1}
          position={["bottomCenter"]}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data?.data?.pagination?.totalData || 0}
          current={page}
          onChange={(currentPage) => setPage(currentPage)}
          pageSize={10}
        />
      </div>
    </div>
  );
}
