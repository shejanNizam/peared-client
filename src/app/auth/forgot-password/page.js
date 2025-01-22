// app/forgot-password/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { Button, Form, Input, message } from "antd";
import Link from "next/link"; // Next.js Link component
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6"; // Importing the back arrow icon

const ForgotPassword = () => {
  const router = useRouter(); // Initialize Next.js router
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      // Example: Send data to your API endpoint
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("OTP has been sent to your email!");
      router.push("/auth/verify-email"); // Navigate to verify email page after successful submission
    } catch (error) {
      console.error("Forgot Password error:", error);
      message.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4 ">
      {/* Forgot Password Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 hover:text-gray-800 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeftLong size={24} />
        </button>

        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Forgot Password</h2>
          <p className="text-center text-gray-600 mt-2">
            Enter your email address below and well send you an OTP to reset
            your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Email Field */}
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

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Send OTP
            </Button>
          </Form.Item>

          {/* Navigation Link to Login Page */}
          <p className="text-center">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
