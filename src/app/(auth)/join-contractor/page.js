"use client";

import { useJoinAsProviderMutation } from "@/redux/features/authApi";
import { useAllCategoryQuery } from "@/redux/features/projects/projectApi";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const { Text } = Typography;

const JoinAsContractor = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [certificate, setCertificates] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const [joinProvider, { isLoading }] = useJoinAsProviderMutation();

  const { data } = useAllCategoryQuery();
  const serviceCategories = data?.data || [];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBeforeUpload = (file) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed!");
      return Upload.LIST_IGNORE;
    }

    let newFileList = [...certificates, file];
    if (newFileList.length > 2) {
      message.error("You can only upload a maximum of 2 PDF files.");
      return Upload.LIST_IGNORE;
    }
    setCertificates(newFileList);

    return false;
  };

  const onFinish = async (values) => {
    if (!certificate || certificate.length === 0) {
      message.error("Please upload at least one certificate.");
      return;
    }

    const data = { ...values, certificate: certificate };
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }
    certificate.forEach((file, index) => {
      formData.append(`certificate`, file.originFileObj);
    });

    try {
      const response = await joinProvider(formData).unwrap();
      setPaymentUrl(response?.data);

      setIsModalVisible(true);
    } catch (error) {
      message.error(`${error.message}`);
    }
  };

  const handlePayNow = () => {
    message.success("Payment successful! Redirecting...");
    window.location.href = paymentUrl;
    // router.push("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleFileChange = ({ fileList }) => {
    console.log("Updated File List:", fileList);

    if (fileList.length > 2) {
      message.error("You can only upload a maximum of 2 PDF files.");
      fileList = fileList.slice(0, 2);
    }

    setCertificates(fileList);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl px-8 md:px-16 py-4 md:py-8 my-20 relative">
          <button
            onClick={handleBack}
            className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 focus:outline-none"
            aria-label="Go Back"
          >
            <FaArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-8 border-b-2 border-b-secondary">
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
                label={<span className="text-black font-semibold">Name</span>}
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
                label={<span className="text-black font-semibold">Email</span>}
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
                  <span className="text-black font-semibold">Password</span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                label={
                  <span className="text-black font-semibold">
                    Confirm Password
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
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
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
              label={<span className="text-black font-semibold">Services</span>}
              name="service"
              rules={[
                {
                  required: true,
                  message: "Please select at least one service",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select the services you provide"
                size="large"
              >
                {serviceCategories?.map((service) => (
                  <Select.Option key={service._id} value={service.catagory}>
                    {service.catagory}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item
              label={<span className="text-black font-semibold">Services</span>}
              name="service"
              rules={[
                {
                  required: true,
                  message: "Please select at least one service",
                },
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
            </Form.Item> */}

            {/* Document Upload Field */}
            <Form.Item
              label={
                <span className="text-black font-semibold">
                  Upload Document (PDF)
                </span>
              }
              required
              name="certificate"
              valuePropName="fileList"
              getValueFromEvent={({ fileList }) => fileList}
            >
              <Upload
                accept="application/pdf"
                maxCount={2}
                showUploadList
                className="w-full"
                beforeUpload={handleBeforeUpload}
                onChange={handleFileChange}
              >
                <Button
                  htmlType="button"
                  icon={<UploadOutlined />}
                  size="large"
                  block
                >
                  Upload Document (PDF)
                </Button>
              </Upload>
              <Text type="secondary" className="mt-2 block">
                Maximum of 2 PDF files.
              </Text>
            </Form.Item>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl text-primary font-semibold mb-8">
                To join as a contractor, you need to pay <strong>$30</strong>.
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
                      : Promise.reject(
                          new Error("You must agree to the terms")
                        ),
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
                loading={isLoading}
                className="w-full transition-colors"
              >
                Join
              </Button>
            </Form.Item>

            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Log In
              </Link>
            </p>
          </Form>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable
        centered
      >
        {/* Modal content matching your design */}
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700">Pay Now</h2>
          <p className="mb-6">For join as a Contractor pay $30</p>

          {/* Big price text */}
          <div className="text-4xl font-bold text-gray-700 mb-4">$30</div>

          {/* Optionally place an image or icon here */}
          {/* <img src="/some-money-illustration.png" alt="Payment" className="mx-auto mb-6" /> */}

          {/* Payment button */}
          <Button
            type="primary"
            size="large"
            className="bg-green-500 hover:bg-green-600 border-none"
            onClick={handlePayNow}
            block
          >
            Pay Now
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default JoinAsContractor;
