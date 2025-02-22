"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useMyProjectBitDetailsQuery,
  useProjectApprovedMutation,
} from "@/redux/features/projects/projectApi";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Payment(props) {
  const { approvdProjectId } = props.searchParams;
  const router = useRouter();

  const { data } = useMyProjectBitDetailsQuery(approvdProjectId);
  const bid = data?.data;

  const [approved, { isLoading }] = useProjectApprovedMutation();

  const handlePayment = async (id) => {
    console.log(id);
    try {
      const response = await approved(id).unwrap();
      // console.log(response);
      SuccessSwal({
        title: "",
        text: " Payment Successfull! ",
      });
      router.push("/profile/my-projects");
      // if (response?.statusCode === 510) {
      //   router.push(`/profile/wallet`);
      // }
      // router.push(`/profile/project-details-message`);
    } catch (error) {
      console.log(error?.data);
      const statusCode = error?.data?.statusCode;
      // console.log(statusCode);

      if (statusCode === 409) {
        Swal.fire({
          text:
            error?.message || error?.data?.message || "something went wrong",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go My Projects",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/profile/my-projects");
          }
        });
      }

      if (statusCode === 510) {
        Swal.fire({
          text:
            error?.message || error?.data?.message || "something went wrong",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go Wallet",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/profile/wallet");
          }
        });
      }
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-primary mb-4">Payment</h1>
      <p className="text-gray-600 mb-6 text-center">
        Pay Now to confirm your project. <br /> Don’t worry it will be safe in
        admin hands until the project is done.
      </p>
      <div className="bg-green-50 rounded-lg shadow-md p-6 w-full max-w-sm">
        {/* Project Info */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Project : </p>
            <p> {bid?.projectType} </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Starting Date : </p>
            {/* <p>{format(new Date(bid?.startDate), "dd MMM yyyy")}</p> */}
            <p>{"56 feb"}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Service Time :</p>
            <p> {bid?.serviceTime} days </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Price : </p>
            <p>$ {bid?.price} </p>
          </div>
        </div>
        {/* Pay Now Button */}

        <Button
          type="primary"
          loading={isLoading}
          className=" w-full"
          onClick={() => handlePayment(approvdProjectId)}
        >
          {" "}
          Pay Now{" "}
        </Button>
      </div>
    </div>
  );
}
