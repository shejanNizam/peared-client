"use client";

import { useGetUserDataQuery } from "@/redux/features/userApi";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import image from "../../../assets/home/feedback/image1.png";

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    streetAddress: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    image: image, // Default image
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

  const { data } = useGetUserDataQuery();
  const user = data?.data;

  // Ensure image is set when opening the modal
  const openEditModal = () => {
    setFormData({ ...userData, image: userData.image });
    setPreviewImage(userData.image); // Set preview image
    setIsEditModalOpen(true);
  };

  // Handle Image Upload Change
  const handleImageChange = ({ fileList }) => {
    if (fileList.length === 0) {
      // If no new image is uploaded, retain the existing image
      setFormData((prev) => ({
        ...prev,
        image: userData.image,
      }));
      setPreviewImage(userData.image);
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

  // Handle Edit Form Submission
  const handleEditFormSubmit = (values) => {
    const updatedData = { ...values, image: formData.image || userData.image };

    setUserData(updatedData);
    setProfileImage(updatedData.image);
    message.success("Profile updated successfully!");

    setIsEditModalOpen(false);
    editForm.resetFields();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-12">
        {/* Edit Button */}
        <button
          ref={editButtonRef}
          onClick={openEditModal}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Edit
        </button>

        {/* Profile Image */}
        <Image
          src={profileImage}
          alt="Profile Image"
          className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full"
          width={256}
          height={256}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600 mb-4">{userData.email}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={600}
      >
        {/* Form */}
        <Form
          layout="vertical"
          initialValues={userData}
          onFinish={handleEditFormSubmit}
          form={editForm}
        >
          {/* Image Upload */}
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
          {previewImage && (
            <div className="flex justify-center">
              <Image
                src={previewImage}
                alt="Profile Preview"
                width={100}
                height={100}
                className="object-cover rounded-full w-24 h-24"
              />
            </div>
          )}

          {/* Name Field */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Street Address */}
          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[{ required: true, message: "Enter address" }]}
          >
            <Input placeholder="Enter your street address" />
          </Form.Item>

          {/* City */}
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Enter city" }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          {/* Postal Code */}
          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[{ required: true, message: "Enter postal code" }]}
          >
            <Input placeholder="Enter your postal code" />
          </Form.Item>

          {/* Save Changes Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary hover:bg-secondary-dark transition"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
