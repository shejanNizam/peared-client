"use client";

import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Select, Typography, Upload } from "antd";

const { Text } = Typography;

const JoinAsContractor = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Join as Contractor successful! Redirecting to login...");
      router.push("/auth/login");
    } catch (error) {
      message.error("Joining failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload PDF check
  const handleBeforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF files!");
    }
    return isPDF;
  };

  // Handle file change (for error handling if more than 2 files are uploaded)
  const handleFileChange = (info) => {
    const { fileList } = info;

    if (fileList.length > 2) {
      message.error("You can only upload a maximum of 2 PDF files.");
      info.fileList = fileList.slice(0, 2); // Keeps only the first 2 files
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <div className="bg-white shadow-2xl rounded-2xl rounded-tl-[8rem] md:rounded-tl-[10rem] rounded-br-[8rem] md:rounded-br-[10rem] w-full max-w-xl px-8 md:px-16 py-4 md:py-8 my-20">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-secondary">
            Join As Contractor
          </h2>
        </div>

        {/* Signup Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
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

          {/* Services Select (multiple selection) */}
          <Form.Item
            label={<span className="text-black font-semibold"> Services </span>}
            name="services"
            rules={[
              { required: true, message: "Please select at least one service" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select the services you provide"
              size="large"
            >
              <Select.Option value="Residential Cleaning">
                Residential Cleaning
              </Select.Option>
              <Select.Option value="Commercial Cleaning">
                Commercial Cleaning
              </Select.Option>
              <Select.Option value="Painting">Painting</Select.Option>
              <Select.Option value="Landscaping">Landscaping</Select.Option>
              <Select.Option value="Carpentry">Carpentry</Select.Option>
            </Select>
          </Form.Item>

          {/* Document Upload Field */}
          <Form.Item
            label={
              <span className="text-black font-semibold">
                Upload Document (PDF)
              </span>
            }
            name="resume"
            valuePropName="fileList"
            getValueFromEvent={({ fileList }) => fileList}
            // Removed the required rule here
          >
            <Upload
              beforeUpload={handleBeforeUpload}
              accept="application/pdf"
              maxCount={2}
              showUploadList={true}
              className="w-full"
              onChange={handleFileChange} // Handling file changes
            >
              <Button icon={<UploadOutlined />} size="large" block>
                Upload Document (PDF)
              </Button>
            </Upload>
            <Text type="secondary" className="mt-2 block">
              Maximum of 2 PDF files.
            </Text>
          </Form.Item>
          <div>
            <h2 className="text-xl text-primary font-semibold mb-8">
              For Join as a contactor you need to pay $30{" "}
            </h2>
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
              Join
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

export default JoinAsContractor;
