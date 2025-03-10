"use client";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { useUpdateUserDataMutation } from "@/redux/features/userApi";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

import default_img from "../../../assets/user_img_default.png";

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

  // Update preview image when file changes
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (isEditModalOpen && user) {
      // When modal opens and no new file selected, show the user image
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
  }, [file, isEditModalOpen, user, baseUrl]);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    setFile(file);
    return false;
  };

  const handleFileChange = ({ file }) => {
    if (!file.type.startsWith("image/")) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return;
    }
    setFile(file);
  };

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
      ErrorSwal({
        title: "",
        text: error?.message || error?.data?.message || "Something went wrong",
      });
    }
  };

  const formattedImage = user?.image
    ? user.image.replace(/^public/, "")
    : default_img.src;

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-8 md:p-12">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Update
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
              : default_img.src)
          }
          alt="Profile Image"
          className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full"
          width={1000}
          height={1000}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-primary mb-4">{user?.email}</p>

          <form className="w-full">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block text-black font-semibold"
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
                    className="block text-black font-semibold"
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
                    className="block text-black font-semibold"
                  >
                    Post Code
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
          <span className="text-xl font-bold text-primary">Update Profile</span>
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
