"use client";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useUpdateUserDataMutation } from "@/redux/features/userApi";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const { user } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserDataMutation();

  // Update the preview URL whenever a new file is selected
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage(null);
    }
  }, [file]);

  // Check file type before upload and store file in state
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    setFile(file);
    return false; // Prevent auto-upload
  };

  // Handle file changes (for a single image)
  const handleFileChange = ({ file }) => {
    console.log("Uploaded File:", file);
    if (!file.type.startsWith("image/")) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return;
    }
    setFile(file);
  };

  // Handle form submission for editing the profile
  const handleEditFormSubmit = async (values) => {
    const formData = new FormData();
    const updatedValues = {
      ...values,
      image: file, // Use the file selected by the user
    };

    Object.keys(updatedValues).forEach((key) => {
      formData.append(key, updatedValues[key]);
    });
    console.log(updatedValues);

    try {
      const response = await updateUser(formData).unwrap();
      console.log(response);
      setIsEditModalOpen(false);
      SuccessSwal({
        title: "",
        text: `Profile updated successfully!`,
      });
    } catch (error) {
      message.error(error?.message || error?.data?.message);
    }
  };

  // Handle change password form submission
  const handleChangePassword = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    if (oldPassword === "incorrect") {
      message.error("Old password is incorrect");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match");
      return;
    }
    message.success("Password changed successfully!");
    setIsChangePasswordModalOpen(false);
    passwordForm.resetFields();
  };

  useEffect(() => {
    if (isEditModalOpen && user && !file) {
      const formattedImage = user.image
        ? user.image.replace(/^public/, "")
        : "/default-profile.png";
      setPreviewImage(
        baseUrl +
          (formattedImage.startsWith("/")
            ? formattedImage
            : "/" + formattedImage)
      );
    }
  }, [isEditModalOpen, user, file, baseUrl]);

  // Format the image path (remove "public" if present)
  const formattedImage = user?.image
    ? user.image.replace(/^public/, "")
    : "/default-profile.png";

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-12">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Edit
        </button>

        {/* Profile Image */}
        <Image
          src={
            previewImage ||
            (user?.image
              ? baseUrl +
                (formattedImage.startsWith("/")
                  ? formattedImage
                  : "/" + formattedImage)
              : "/default-profile.png")
          }
          alt="Profile Image"
          className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full"
          width={256}
          height={256}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 mb-4">{user?.email}</p>

          {/* Profile Details */}
          <form className="w-full">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={user?.address}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={user?.city}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={user?.postalCode}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Button */}
      <button
        onClick={() => setIsChangePasswordModalOpen(true)}
        className="mt-6 bg-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded hover:bg-secondary-dark transition"
      >
        Change Password
      </button>

      {/* Edit Profile Modal */}
      <Modal
        title={
          <span className="text-xl font-bold text-primary"> Edit Profile </span>
        }
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={500}
      >
        <Form
          layout="vertical"
          initialValues={user}
          onFinish={handleEditFormSubmit}
          form={form}
        >
          <Form.Item
            label={
              <span className="text-black font-semibold">Profile Image</span>
            }
            name="image"
            rules={[
              { required: true, message: "Please upload a profile image." },
            ]}
          >
            <div className="relative flex justify-center">
              {/* Preview image container */}
              <div className="relative">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile Preview"
                    width={100}
                    height={100}
                    className="object-cover rounded-full w-24 h-24"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full" />
                )}

                {/* Upload button overlayed on the image */}
                <Upload
                  name="image"
                  maxCount={1}
                  fileList={file ? [file] : []}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleFileChange}
                  showUploadList={false}
                  // Remove default styling if needed and use absolute positioning
                  className="absolute top-8 right-8"
                >
                  <div
                    className="p-2 bg-white rounded-full shadow cursor-pointer"
                    title="Change Profile Image"
                  >
                    <FaPlus />
                  </div>
                </Upload>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Street Address"
            name="address"
            rules={[
              { required: true, message: "Please enter your street address" },
            ]}
          >
            <Input placeholder="Enter your street address" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[
              { required: true, message: "Please enter your postal code" },
              {
                pattern: /^\d{1,4}$/,
                message: "Postal code must be up to 4 digits",
              },
            ]}
          >
            <Input placeholder="Enter your postal code" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isChangePasswordModalOpen={isChangePasswordModalOpen}
        setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
        handleChangePassword={handleChangePassword}
      />

      {/* <Modal
        title="Change Password"
        visible={isChangePasswordModalOpen}
        onCancel={() => setIsChangePasswordModalOpen(false)}
        footer={null}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
          form={passwordForm}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
          >
            <Input.Password placeholder="Enter your old password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
}
