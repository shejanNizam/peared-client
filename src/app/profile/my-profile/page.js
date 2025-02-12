"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import image from "../../../assets/home/feedback/image1.png";

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    streetAddress: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    image: image,
  });
  const [formData, setFormData] = useState({ ...userData });
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(image);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const editButtonRef = useRef(null);
  const changePasswordButtonRef = useRef(null);
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleImageChange = ({ fileList }) => {
    if (fileList.length === 0) {
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
      setPreviewImage(null);
      return;
    }

    const fileObj = fileList[0].originFileObj;

    if (!fileObj || !(fileObj instanceof Blob)) {
      message.error("Invalid file type. Please upload a valid image.");
      return;
    }

    const isImage = fileObj.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    const isLt2M = fileObj.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target.result,
      }));
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(fileObj);
  };

  const handleEditFormSubmit = (values) => {
    setUserData({ ...values, image: formData.image });
    setProfileImage(formData.image);
    message.success("Profile updated successfully!");
    setIsEditModalOpen(false);
    editForm.resetFields();
  };

  const handleChangePassword = (values) => {
    const { email, oldPassword, newPassword, confirmPassword } = values;

    if (oldPassword === "incorrect") {
      message.error("Old password is incorrect");
      return;
    }
    message.success("Password changed successfully!");
    setIsChangePasswordModalOpen(false);
    passwordForm.resetFields();
  };

  const openEditModal = () => {
    setFormData({ ...userData });
    setIsEditModalOpen(true);
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  useEffect(() => {
    if (isEditModalOpen) {
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
  }, [isEditModalOpen]);

  useEffect(() => {
    if (isChangePasswordModalOpen) {
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

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (isEditModalOpen) {
          setIsEditModalOpen(false);
        }
        if (isChangePasswordModalOpen) {
          setIsChangePasswordModalOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isEditModalOpen, isChangePasswordModalOpen]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      {/* Bordered Container */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-12">
        {/* Edit Button Positioned Absolutely */}
        <button
          ref={editButtonRef}
          onClick={openEditModal}
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
                    // defaultValue={userData.postalCode}
                    value={userData.postalCode}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm md:text-base"
                  />
                </div>
              </div>
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

      {/* Edit Profile Modal using Ant Design's Modal */}
      <Modal
        title={
          <span className=" text-2xl text-primary font-semibold ">
            {" "}
            Edit Profile{" "}
          </span>
        }
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null} // We'll handle the footer with the form's submit button
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={600} // Adjust width as needed for responsiveness
        className="custom-edit-modal" // Optional: For additional styling
      >
        {/* Ant Design Form */}
        <Form
          layout="vertical"
          initialValues={userData}
          onFinish={handleEditFormSubmit}
          className="flex flex-col gap-4"
          form={editForm}
        >
          {/* Image Upload Field */}
          <Form.Item
            label={
              <span className="text-black font-semibold"> Profile Photo </span>
            }
          >
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
                width={1000}
                height={1000}
                className="object-cover rounded-full w-24 h-24"
              />
            </div>
          )}

          {/* Name Field */}
          <Form.Item
            label={<span className="text-black font-semibold"> Name </span>}
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
            label={
              <span className="text-black font-semibold"> Street Address </span>
            }
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
            label={<span className="text-black font-semibold"> City </span>}
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input placeholder="Enter your city" size="middle" />
          </Form.Item>

          {/* Postal Code Field */}
          <Form.Item
            label={
              <span className="text-black font-semibold"> Postal Code </span>
            }
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
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title={
          <span className="text-2xl text-primary font-bold">
            {" "}
            Change Password{" "}
          </span>
        }
        visible={isChangePasswordModalOpen}
        onCancel={() => setIsChangePasswordModalOpen(false)}
        footer={null} // We'll handle the footer with the form's submit button
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        className="custom-modal" // Optional: For additional styling
        width={600} // Adjust width as needed for responsiveness
      >
        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
          className="flex flex-col gap-4"
          form={passwordForm}
        >
          {/* Old Password Field */}
          <Form.Item
            label={
              <span className="text-black font-semibold"> Old Password </span>
            }
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
            label={
              <span className="text-black font-semibold"> New Password </span>
            }
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
            label={
              <span className="text-black font-semibold">
                {" "}
                Confirm New Password{" "}
              </span>
            }
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
