// components/MyProfile.jsx

"use client"; // Ensures client-side rendering for hooks

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the FaTimes icon
import { Form, Input, Button, Upload, Checkbox, Modal, message } from "antd"; // Import Ant Design components
import { UploadOutlined } from "@ant-design/icons"; // Import Ant Design icons
import image from "../../../assets/home/feedback/image1.png";

export default function MyProfile() {
  // Initialize user data state
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    streetAddress: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    image: image, // Add image to user data
  });

  // State to control Edit Profile modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to control Change Password modal visibility
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // State to manage closing animation
  const [isClosing, setIsClosing] = useState(false);

  // Ref for the Edit button to return focus after closing modal
  const editButtonRef = useRef(null);

  // Ref for the Change Password button to return focus after closing modal
  const changePasswordButtonRef = useRef(null);

  // Ref for the Ant Design Form instance
  const [form] = Form.useForm();

  // State to manage form inputs within the Edit Profile modal
  const [formData, setFormData] = useState({ ...userData });

  // State for image preview
  const [previewImage, setPreviewImage] = useState(null);

  // State to manage profile image
  const [profileImage, setProfileImage] = useState(image); // Initialize with the default image

  // Handle image upload and preview in Edit Profile modal
  const handleImageChange = ({ fileList }) => {
    if (fileList.length === 0) {
      // No files uploaded
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
      setPreviewImage(null);
      return;
    }

    const fileObj = fileList[0].originFileObj; // Access the first (and only) file

    if (!fileObj || !(fileObj instanceof Blob)) {
      message.error("Invalid file type. Please upload a valid image.");
      return;
    }

    // Validate file type
    const isImage = fileObj.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    // Validate file size (e.g., max 2MB)
    const isLt2M = fileObj.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return;
    }

    // Read the image and set it for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target.result, // Store the Data URL
      }));
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(fileObj);
  };

  // Handle form submission in the Edit Profile modal
  const handleFormSubmit = (values) => {
    // Update user data with form values, including the new image
    setUserData({ ...values, image: formData.image });
    // Update the profile image state to reflect changes in the main view
    setProfileImage(formData.image);
    // Initiate closing animation
    setIsClosing(true);
    // Show success message
    message.success("Profile updated successfully!");
    // Close the modal after animation
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      // Optionally, reset the form fields if needed
    }, 300); // Duration should match the Tailwind transition duration
  };

  // Handle form submission in the Change Password modal
  const handleChangePassword = (values) => {
    const { email, oldPassword, newPassword, confirmPassword } = values;

    // Mock validation: In real scenarios, verify oldPassword with backend
    if (oldPassword === "incorrect") {
      message.error("Old password is incorrect");
      return;
    }

    // Mock success: Update password
    message.success("Password changed successfully!");

    // Close the Change Password modal
    closeChangePasswordModal();

    // Optionally, reset the form fields
    // form.resetFields();
  };

  // Handle opening the Edit Profile modal and initializing form data
  const openModal = () => {
    setFormData({ ...userData }); // Reset form data to current user data
    setIsModalOpen(true);
  };

  // Handle closing the Edit Profile modal without saving
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300); // Duration should match the Tailwind transition duration
  };

  // Handle opening the Change Password modal
  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  // Handle closing the Change Password modal
  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  // Focus management: Focus first input when modal opens and return focus when it closes
  useEffect(() => {
    if (isModalOpen) {
      // Delay to ensure the modal is rendered
      setTimeout(() => {
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) {
          nameInput.focus();
        }
      }, 100);
    } else {
      if (editButtonRef.current) {
        editButtonRef.current.focus();
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isChangePasswordModalOpen) {
      // Delay to ensure the modal is rendered
      setTimeout(() => {
        const emailInput = document.querySelector('input[name="email"]');
        if (emailInput) {
          emailInput.focus();
        }
      }, 100);
    } else {
      if (changePasswordButtonRef.current) {
        changePasswordButtonRef.current.focus();
      }
    }
  }, [isChangePasswordModalOpen]);

  // Handle closing modal with Esc key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (isModalOpen) {
          closeModal();
        }
        if (isChangePasswordModalOpen) {
          closeChangePasswordModal();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, isChangePasswordModalOpen]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      {/* Bordered Container */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-6">
        {/* Edit Button Positioned Absolutely */}
        <button
          ref={editButtonRef}
          onClick={openModal}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
        >
          Edit
        </button>

        {/* Profile Image */}
        <Image
          src={profileImage}
          alt="Profile Image"
          className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full"
          width={256} // Adjust based on image size
          height={256}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600 mb-4">{userData.email}</p>

          {/* Profile Details */}
          <form className="w-full">
            <div className="flex flex-col gap-6">
              {/* Full-Width Field: Street Address */}
              <div className="w-full">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={userData.streetAddress}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm md:text-base"
                />
              </div>

              {/* Two Half-Width Fields: City and Postal Code */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* City Field */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={userData.city}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm md:text-base"
                  />
                </div>

                {/* Postal Code Field */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={userData.postalCode}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Remove the Save Changes button from the main form */}
              {/* It will be handled via the Edit Profile modal */}
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Button */}
      <button
        ref={changePasswordButtonRef}
        onClick={openChangePasswordModal}
        className="mt-6 bg-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded hover:bg-secondary-dark transition focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
      >
        Change Password
      </button>

      {/* Success Message */}
      {/* Optional: If you prefer using Ant Design's message component, this can be omitted */}
      {/* {isSuccess && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg text-sm md:text-base">
          Profile updated successfully!
        </div>
      )} */}

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeModal} // Close modal when clicking on the overlay
        >
          {/* Modal Content */}
          <div
            className={`bg-white rounded-lg shadow-lg w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 p-6 relative transform transition-transform duration-300 ${
              isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button with React Icon */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Close Modal"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* Ant Design Form */}
            <Form
              layout="vertical"
              initialValues={userData}
              onFinish={handleFormSubmit}
              className="flex flex-col gap-4"
              form={form}
            >
              {/* Image Upload Field */}
              <Form.Item label="Profile Photo">
                <Upload
                  name="profile"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={handleImageChange}
                  maxCount={1} // Limit to single image upload
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              {/* Display Image Preview */}
              {formData.image && (
                <div className="flex justify-center">
                  <Image
                    src={formData.image}
                    alt="Profile Preview"
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                </div>
              )}

              {/* Name Field */}
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input placeholder="Enter your name" size="middle" />
              </Form.Item>

              {/* Street Address Field */}
              <Form.Item
                label="Street Address"
                name="streetAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address",
                  },
                ]}
              >
                <Input placeholder="Enter your street address" size="middle" />
              </Form.Item>

              {/* City Field */}
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="Enter your city" size="middle" />
              </Form.Item>

              {/* Postal Code Field */}
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
                <Input placeholder="Enter your postal code" size="middle" />
              </Form.Item>

              {/* Save Changes Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-primary hover:bg-secondary-dark transition text-sm md:text-base"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isChangePasswordModalOpen}
        onCancel={closeChangePasswordModal}
        footer={null} // We'll handle the footer with the form's submit button
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        className="custom-modal" // Optional: For additional styling
      >
        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
          className="flex flex-col gap-4"
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter your email" size="middle" />
          </Form.Item>

          {/* Old Password Field */}
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
          >
            <Input.Password
              placeholder="Enter your old password"
              size="middle"
            />
          </Form.Item>

          {/* New Password Field */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your new password"
              size="middle"
            />
          </Form.Item>

          {/* Confirm New Password Field */}
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm your new password"
              size="middle"
            />
          </Form.Item>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <Form.Item
              name="rememberMe"
              valuePropName="checked"
              className="mb-0"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary hover:bg-secondary-dark transition text-sm md:text-base"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
