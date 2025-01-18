"use client";

import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    } catch (error) {
      message.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <div className="bg-white shadow-2xl rounded-2xl rounded-tl-[8rem] md:rounded-tl-[10rem] rounded-br-[8rem] md:rounded-br-[10rem] w-full max-w-xl p-8 md:p-16 mt-[-100px]">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-secondary">
            Create Your Account
          </h2>
        </div>

        {/* Signup Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          {/* User Information Fields */}
          <div className="grid grid-cols-1">
            {/* Name */}
            <Form.Item
              label={<span className="text-black font-semibold"> Name </span>}
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
              label={<span className="text-black font-semibold"> Email </span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                { required: true, message: "Please enter your valid email" },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={
                <span className="text-black font-semibold"> Password </span>
              }
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
              label={
                <span className="text-black font-semibold">
                  {" "}
                  Confirm Password{" "}
                </span>
              }
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

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
          </div> */}

          {/* Address Fields */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[
                { required: true, message: "Please enter your street address" },
              ]}
            >
              <Input placeholder="Enter your street address" size="large" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="Enter your city" size="large" />
            </Form.Item>

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
          </div> */}

          {/* Add Card Heading */}
          {/* <h2 className="text-xl font-semibold mt-6 mb-4">Add Card</h2> */}

          {/* Payment Information Fields */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[
                { required: true, message: "Please select the expiry date" },
              ]}
            >
              <Input type="month" />
            </Form.Item>
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
          </div> */}

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
            <Checkbox>
              I have read & agreed to Peared{" "}
              <Link href="/terms-of-use">
                <span className="text-primary">Terms of Use</span>
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy">
                <span className="text-primary">Privacy Policy</span>
              </Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full transition-colors"
            >
              Create Account
            </Button>
          </Form.Item>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
