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

  const { user } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserDataMutation();

  // Update the preview URL when a new file is selected
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
    if (!file.type.startsWith("image/")) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return;
    }
    setFile(file);
  };

  // Handle form submission for editing the profile
  const handleEditFormSubmit = async (values) => {
    const formData = new FormData();
    const updatedValues = { ...values, image: file };

    Object.keys(updatedValues).forEach((key) => {
      formData.append(key, updatedValues[key]);
    });

    try {
      await updateUser(formData).unwrap();
      setIsEditModalOpen(false);
      SuccessSwal({
        title: "",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      message.error(error?.message || error?.data?.message);
    }
  };

  // Update preview image when edit modal opens and no new file is selected
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
          Update user
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
          <span className="text-xl font-bold text-primary">
            {" "}
            Update Profile{" "}
          </span>
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
                <Upload
                  name="image"
                  maxCount={1}
                  fileList={file ? [file] : []}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleFileChange}
                  showUploadList={false}
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

      {/* Standalone Change Password Modal */}
      <ChangePasswordModal
        visible={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
