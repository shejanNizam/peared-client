"use client";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notifications() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Pass currentPage to the query to fetch correct data
  const { data, error, isLoading } = useAllNotificationsQuery({
    page: currentPage,
  });

  const handleBack = () => {
    router.back();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the page number when the user changes the page
  };

  const paginatedData = data?.data?.notifications || [];
  const totalData = data?.data?.pagination?.totalData || 0;
  const totalPage = data?.data?.pagination?.totalPage || 0;

  useEffect(() => {
    // Update the pagination if the currentPage exceeds total pages
    if (currentPage > totalPage) {
      setCurrentPage(totalPage); // Prevent going to a non-existent page
    }
  }, [currentPage, totalPage]);

  return (
    <div className="bg-white min-h-screen px-4 py-8 md:py-0">
      <div className="sticky top-20 flex justify-start gap-2 bg-primary rounded-t-md h-20 text-white py-8 pl-8 font-bold">
        <button onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <h2>All Notifications</h2>
      </div>

      <div className="ml-6">
        {isLoading ? (
          <div className="text-center text-gray-500 mt-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-4">
            Error loading notifications
          </div>
        ) : paginatedData?.length === 0 ? (
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

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={10}
          total={totalData}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
        />
      </div>
    </div>
  );
}
