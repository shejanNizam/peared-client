// app/signup/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link"; // Next.js Link component
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";

const Signup = () => {
  const router = useRouter(); // Initialize Next.js router
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      // Example: Send data to your API endpoint
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("Signup successful! Redirecting to login...");
      router.push("/auth/login"); // Navigate to login page after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      message.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4">
      {/* Signup Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        {/* Logo and Static Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Sign Up</h2>
        </div>

        {/* Signup Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* User Information Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Enter your name" size="large" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                { required: true, message: "Email is required" },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
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

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                size="large"
              />
            </Form.Item>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Street Address */}
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[
                { required: true, message: "Please enter your street address" },
              ]}
            >
              <Input placeholder="Enter your street address" size="large" />
            </Form.Item>

            {/* City */}
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="Enter your city" size="large" />
            </Form.Item>

            {/* Postal Code */}
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true, message: "Please enter your postal code" },
                {
                  pattern: /^\d{5}(-\d{4})?$/,
                  message: "Please enter a valid postal code",
                },
              ]}
            >
              <Input placeholder="Enter your postal code" size="large" />
            </Form.Item>
          </div>

          {/* Add Card Heading */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Add Card</h2>

          {/* Payment Information Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Name */}
            <Form.Item
              label="Card Name"
              name="cardName"
              rules={[
                {
                  required: true,
                  message: "Please enter the cardholder's name",
                },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Enter cardholder's name" size="large" />
            </Form.Item>

            {/* Card Number */}
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
                {
                  pattern: /^\d{16}$/,
                  message: "Card number must be 16 digits",
                },
              ]}
            >
              <Input placeholder="Enter your card number" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expiry Date */}
            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[
                { required: true, message: "Please enter the expiry date" },
                {
                  pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                  message: "Expiry date must be in MM/YY format",
                },
              ]}
            >
              <Input placeholder="MM/YY" size="large" />
            </Form.Item>

            {/* CCV */}
            <Form.Item
              label="CCV"
              name="ccv"
              rules={[
                { required: true, message: "Please enter your CCV" },
                {
                  pattern: /^\d{3,4}$/,
                  message: "CCV must be 3 or 4 digits",
                },
              ]}
            >
              <Input placeholder="Enter CCV" size="large" />
            </Form.Item>
          </div>

          {/* I Agree Checkbox */}
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox className="text-green-500">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                terms and conditions
              </a>
            </Checkbox>
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
              Sign Up
            </Button>
          </Form.Item>

          {/* Navigation Link to Login Page */}
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
