// app/login/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link"; // Next.js Link component
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";

const Login = () => {
  const router = useRouter(); // Initialize Next.js router
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      // Example: Send data to your API endpoint
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("Login successful! Redirecting...");
      router.push("/profile/my-profile"); // Navigate to dashboard or desired page after successful login
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4">
      {/* Login Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        {/* Logo and Static Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Login</h2>
        </div>

        {/* Login Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
              { required: true, message: "Email is required" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox className="text-green-500">Remember me</Checkbox>
            </Form.Item>
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Login
            </Button>
          </Form.Item>

          {/* Navigation Link to Signup Page */}
          <p className="text-center">
            {"Don't have an account?"}
            <Link href="/auth/signup" className="text-blue-500 underline">
              Create Account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
