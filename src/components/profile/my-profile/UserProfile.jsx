"use client";

import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "@/redux/features/userApi";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import image from "../../../assets/home/feedback/image1.png";

// Function to handle image upload before sending to server
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState(image);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Fetch user data
  const { data } = useGetUserDataQuery();
  const user = data?.data;

  const [updateUser] = useUpdateUserDataMutation();

  // Handle Image Upload
  const handleImageChange = ({ fileList }) => {
    if (fileList.length === 0) return;

    const fileObj = fileList[0].originFileObj;

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
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(fileObj);
  };

  // Handle Edit Profile form submission
  const handleEditFormSubmit = (values) => {
    const updatedValues = {
      ...values,
      image: profileImage,
    };

    updateUser(updatedValues)
      .then(() => {
        message.success("Profile updated successfully!");
        setIsEditModalOpen(false);
        editForm.resetFields();
      })
      .catch(() => {
        message.error("Error updating profile!");
      });
  };

  // Handle Change Password form submission
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
    if (isEditModalOpen && user) {
      editForm.setFieldsValue({
        name: user.name,
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [isEditModalOpen, user, editForm]);

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
          src={profileImage || user?.image || image}
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
        title="Edit Profile"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={user}
          onFinish={handleEditFormSubmit}
          form={editForm}
        >
          <Form.Item label="Profile Photo">
            <Upload
              name="profile"
              listType="picture"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {profileImage && (
            <div className="flex justify-center">
              <Image
                src={profileImage}
                alt="Profile Preview"
                width={100}
                height={100}
                className="object-cover rounded-full w-24 h-24"
              />
            </div>
          )}

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
      <Modal
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
      </Modal>
    </div>
  );
}
