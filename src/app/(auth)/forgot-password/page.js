"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { useForgotPasswordMutation } from "@/redux/features/authApi";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const ForgotPassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const response = await forgotPassword({
        email: values?.email,
      }).unwrap();
      if (response?.success) {
        localStorage.setItem("user_token", response?.data?.token);
        SuccessSwal({
          title: "OTP has been sent to your email!",
          text: `Check your email in ${values?.email}`,
        });
        router.push(`/verify-email`);
      }
    } catch (error) {
      ErrorSwal({
        title: error?.data?.message || "Something went wrong!",
        text: "",
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4 ">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 hover:text-gray-900 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Forgot Password</h2>
          <p className="text-center text-gray-600 mt-2">
            Enter your email address below and we’ll send you an OTP to reset
            your password.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-black font-semibold"> Email </span>}
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address!" },
              { required: true, message: "Email is required!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Send OTP
            </Button>
          </Form.Item>

          <p className="text-center">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
