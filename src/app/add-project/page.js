"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useAddProjectMutation } from "@/redux/features/projects/projectApi";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import payment_img from "../../assets/payment/payment_img.png";

const { Option } = Select;
const { TextArea } = Input;

const AddProject = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData1, setFormData1] = useState(null);

  const [addProject, { isLoading }] = useAddProjectMutation();

  useEffect(() => {
    const category = localStorage.getItem("selectedCategory");
    // console.log(category);
    if (category) {
      form.setFields([{ name: "projectCategory", value: category }]);
    }
  });

  // Handle Modal Close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }

    setImage(file); // Set only one image
    return false; // Prevent automatic upload
  };
  // console.log("Outside --------------->><<", formData1);

  // Handle form submission
  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "image") {
        formData.append(key, values[key]);
      }
    });
    // Append image file(s) if available
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].originFileObj); // Take the first image file
    }
    setFormData1(formData);
    setIsModalVisible(true);
  };

  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  // Handle image upload
  const handleFileChange = ({ file }) => {
    console.log("Uploaded File:", file);

    if (!file.type.startsWith("image/")) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return;
    }

    setImage(file); // Store the latest uploaded image
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await addProject(formData1).unwrap();
      console.log(" --------------->><<<", response);

      if (response?.statusCode === 200) {
        setIsModalVisible(false);
        router.push("/profile/my-projects");
        SuccessSwal({
          title: "",
          text: "Project created successfully!",
        });
      }
    } catch (error) {
      const statusCode = error?.data?.statusCode;
      console.log(statusCode);
      if (statusCode === 402) {
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
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary p-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 relative">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="absolute top-8 left-8 text-gray-600 hover:text-gray-800 focus:outline-none z-30"
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
            // initialValues={{ projectCategory: "hafvbhv" }}
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
                  label={
                    <span className="text-black font-semibold">Street</span>
                  }
                  name="street"
                  rules={[
                    { required: true, message: "Please enter the street." },
                  ]}
                >
                  <Input placeholder="Enter street" />
                </Form.Item>

                {/* City */}
                <Form.Item
                  label={<span className="text-black font-semibold">City</span>}
                  name="city"
                  rules={[
                    { required: true, message: "Please enter the city." },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>

                {/* Post Code */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">Post Code</span>
                  }
                  name="postCode"
                  rules={[
                    { required: true, message: "Please enter the post code." },
                    {
                      pattern: /^\d{4}(-\d{3})?$/,
                      message: "Please enter a valid post code.",
                    },
                  ]}
                >
                  <Input placeholder="Enter post code" />
                </Form.Item>

                {/* Location Type Dropdown */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">
                      Location Type
                    </span>
                  }
                  name="locationType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the location type.",
                    },
                  ]}
                >
                  <Select placeholder="Select location type">
                    <Option value="Home">Home</Option>
                    <Option value="Business">Business</Option>
                  </Select>
                </Form.Item>

                {/* Time Dropdown */}
                <Form.Item
                  label={<span className="text-black font-semibold">Time</span>}
                  name="time"
                  rules={[
                    { required: true, message: "Please select the time." },
                  ]}
                >
                  <Select placeholder="Select time">
                    <Option value="Urgent(1 - 2 days)">
                      Urgent(1 - 2 days)
                    </Option>
                    <Option value="Within 2 weeks">Within 2 weeks</Option>
                    <Option value="More than 2 weeks">More than 2 weeks</Option>
                    <Option value="Not sure - still planning">
                      Not sure - still planning
                    </Option>
                  </Select>
                </Form.Item>

                {/* Price Range Dropdown */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">
                      Price Range
                    </span>
                  }
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
                  label={
                    <span className="text-black font-semibold">
                      Project Image
                    </span>
                  }
                  name="image"
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
                    maxCount={1}
                    showUploadList={true}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleFileChange}
                  >
                    <Button icon={<FaUpload />}>Upload Image </Button>
                  </Upload>
                </Form.Item>
              </div>

              {/* Right Side: Project Details */}
              <div>
                <h3 className="text-xl font-medium mb-4">Project Details</h3>

                {/* Add Your Project/Work */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">
                      Add Your Project
                    </span>
                  }
                  name="projectName"
                  rules={[
                    {
                      required: true,
                      message: "Please add your project or work.",
                    },
                  ]}
                >
                  <Input placeholder="Describe your project or work" />
                </Form.Item>

                {/* Category (Readonly, set from searchbar selection) */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">
                      Project Category
                    </span>
                  }
                  name="projectCategory"
                >
                  <Input
                    // value={selectedCategory}
                    readOnly
                    className="bg-gray-100 text-gray-700 font-semibold"
                  />
                </Form.Item>

                {/* Work Details Textarea */}
                <Form.Item
                  label={
                    <span className="text-black font-semibold">
                      Work Details
                    </span>
                  }
                  name="workDetails"
                  rules={[
                    { required: true, message: "Please provide work details." },
                    {
                      min: 20,
                      message: "Work details must be at least 20 characters.",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Provide detailed information about the work."
                    rows={13}
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
                className="w-full bg-green-500 hover:bg-green-600 transition-colors"
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
            loading={isLoading}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
            onClick={handlePaymentSuccess}
          >
            Pay Now
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddProject;
