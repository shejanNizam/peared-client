// app/add-project/page.jsx

"use client"; // Enables client-side rendering for hooks and interactivity

import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useState } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa"; // Importing back and upload icons
import payment_img from "../../assets/payment/payment_img.png"; // Importing back and upload icons

const { Option } = Select;

// Function to handle image upload before sending to server
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProject = () => {
  const router = useRouter(); // Initialize Next.js router
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [imageUrl, setImageUrl] = useState(null); // State to hold uploaded image URL
  const [form] = Form.useForm(); // Initialize Ant Design form instance

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle Modal Close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call to add the project
      // Example:
      // const response = await fetch('/api/add-project', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("Project added successfully!");
      form.resetFields(); // Reset form fields after successful submission
      setImageUrl(null); // Reset image
      router.push("/profile/my-projects"); // Navigate to dashboard or desired page
    } catch (error) {
      console.error("Add Project error:", error);
      message.error("Failed to add project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  // Handle image upload
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setImageUrl(null);
      return;
    }
    if (info.file.status === "done" || info.file.status === "error") {
      try {
        const base64 = await getBase64(info.file.originFileObj);
        setImageUrl(base64);
      } catch (error) {
        console.error("Image Upload Error:", error);
        message.error("Failed to upload image.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4 ">
        {/* Add Project Container */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 relative">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none z-50"
            aria-label="Go Back"
          >
            <FaArrowLeft size={24} />
          </button>
          {/* Heading and Description */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-center">
              Add New Project
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Fill in the details below to add a new project.
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            {/* Grid Layout: Left and Right Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Location and Image Details */}
              <div>
                <h3 className="text-xl font-medium mb-4">Location & Image</h3>

                {/* Street */}
                <Form.Item
                  label="Street"
                  name="street"
                  rules={[
                    { required: true, message: "Please enter the street." },
                  ]}
                >
                  <Input placeholder="Enter street" />
                </Form.Item>

                {/* City */}
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter the city." },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>

                {/* Post Code */}
                <Form.Item
                  label="Post Code"
                  name="postCode"
                  rules={[
                    { required: true, message: "Please enter the post code." },
                    {
                      pattern: /^\d{5}(-\d{4})?$/,
                      message: "Please enter a valid post code.",
                    },
                  ]}
                >
                  <Input placeholder="Enter post code" />
                </Form.Item>

                {/* Location Type Dropdown */}
                <Form.Item
                  label="Location Type"
                  name="locationType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the location type.",
                    },
                  ]}
                >
                  <Select placeholder="Select location type">
                    <Option value="office">Office</Option>
                    <Option value="remote">Remote</Option>
                    <Option value="hybrid">Hybrid</Option>
                  </Select>
                </Form.Item>

                {/* Time Dropdown */}
                <Form.Item
                  label="Time"
                  name="time"
                  rules={[
                    { required: true, message: "Please select the time." },
                  ]}
                >
                  <Select placeholder="Select time">
                    <Option value="full-time">Full-Time</Option>
                    <Option value="part-time">Part-Time</Option>
                    <Option value="contract">Contract</Option>
                  </Select>
                </Form.Item>

                {/* Price Range Dropdown */}
                <Form.Item
                  label="Price Range"
                  name="priceRange"
                  rules={[
                    {
                      required: true,
                      message: "Please select the price range.",
                    },
                  ]}
                >
                  <Select placeholder="Select price range">
                    <Option value="0-1000">0 - 1,000</Option>
                    <Option value="1001-5000">1,001 - 5,000</Option>
                    <Option value="5001-10000">5,001 - 10,000</Option>
                    <Option value="10001+">10,001+</Option>
                  </Select>
                </Form.Item>

                {/* Image Upload */}
                <Form.Item
                  label="Project Image"
                  name="projectImage"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please upload a project image.",
                    },
                  ]}
                >
                  <Upload
                    name="logo"
                    listType="picture"
                    showUploadList={false}
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleChange}
                  >
                    <Button icon={<FaUpload />}>Click to Upload</Button>
                  </Upload>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Project Image"
                      className="mt-4 h-40 w-full object-cover rounded"
                    />
                  )}
                </Form.Item>
              </div>

              {/* Right Side: Project Details */}
              <div>
                <h3 className="text-xl font-medium mb-4">Project Details</h3>

                {/* Add Your Project/Work */}
                <Form.Item
                  label="Add Your Project/Work"
                  name="projectWork"
                  rules={[
                    {
                      required: true,
                      message: "Please add your project or work.",
                    },
                  ]}
                >
                  <Input placeholder="Describe your project or work" />
                </Form.Item>

                {/* Project Category Dropdown */}
                <Form.Item
                  label="Project Category"
                  name="projectCategory"
                  rules={[
                    {
                      required: true,
                      message: "Please select the project category.",
                    },
                  ]}
                >
                  <Select placeholder="Select project category">
                    <Option value="web-development">Web Development</Option>
                    <Option value="mobile-development">
                      Mobile Development
                    </Option>
                    <Option value="design">Design</Option>
                    <Option value="marketing">Marketing</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                {/* Work Details Textarea */}
                <Form.Item
                  label="Work Details"
                  name="workDetails"
                  rules={[
                    { required: true, message: "Please provide work details." },
                    {
                      min: 20,
                      message: "Work details must be at least 20 characters.",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Provide detailed information about the work."
                    rows={6}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 transition-colors"
                onClick={showModal}
              >
                Add Project
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="pay-now-modal"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-green-600 mb-2">
            Pay Now
          </h1>
          <p className="text-gray-600 mb-4">
            To show your post, pay first. We need $1/week to boost this post.
          </p>
          <div className="text-5xl font-bold text-gray-800 mb-4">$1</div>

          {/* Illustration */}
          <div className="mb-6">
            <Image
              src={payment_img} // Replace with the correct path to your image
              alt="payment_img"
              className="mx-auto"
            />
          </div>

          {/* Pay Now Button */}
          <Button
            type="primary"
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
            onClick={() => alert("Payment Successful!")} // Replace with payment logic
          >
            Pay Now
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddProject;
