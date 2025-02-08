"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useResetPasswordMutation } from "@/redux/features/authApi";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  // Our RTK Query mutation
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("user_token");
      console.log(token);

      await resetPassword({
        token,
        body: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      }).unwrap();
      SuccessSwal({
        title: "Password Reset Successful!",
        text: "You can now log in.",
      });
      localStorage.removeItem("user_token");
      router.push("/login");
    } catch (error) {
      console.log(error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Reset Your Password</h2>
          <p className="text-center text-gray-600 mt-2">
            Please enter your new password below.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            label={
              <span className="text-black font-semibold">New Password</span>
            }
            name="password"
            rules={[
              { required: true, message: "Please enter your new password." },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your new password"
              size="large"
              aria-label="New Password"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-black font-semibold">Confirm Password</span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match."));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Confirm your new password"
              size="large"
              aria-label="Confirm New Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Reset Password
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

export default ResetPassword;
