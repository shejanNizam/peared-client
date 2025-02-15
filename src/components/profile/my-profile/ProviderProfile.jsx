"use client";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { useUpdateUserDataMutation } from "@/redux/features/userApi";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProviderProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { user } = useSelector((state) => state.auth);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Certificate file states (for new uploads)
  const [certificate1File, setCertificate1File] = useState(null);
  const [certificate2File, setCertificate2File] = useState(null);

  // Display URLs for existing certificates from user data
  const [certificate1Url, setCertificate1Url] = useState(null);
  const [certificate2Url, setCertificate2Url] = useState(null);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const [form] = Form.useForm();
  const [updateUser, { isLoading }] = useUpdateUserDataMutation();

  // Update certificate URLs from user.certificate (an array)
  useEffect(() => {
    if (user && user.certificate && Array.isArray(user.certificate)) {
      if (user.certificate.length > 0) {
        setCertificate1Url(
          user.certificate[0].startsWith("http")
            ? user.certificate[0]
            : baseUrl + user.certificate[0]
        );
      }
      if (user.certificate.length > 1) {
        setCertificate2Url(
          user.certificate[1].startsWith("http")
            ? user.certificate[1]
            : baseUrl + user.certificate[1]
        );
      }
    }
  }, [user, baseUrl]);

  // Set image preview based on user.image
  useEffect(() => {
    if (user?.image) {
      const formattedImage = user.image.replace(/^public/, "");
      setPreviewImage(
        baseUrl +
          (formattedImage.startsWith("/")
            ? formattedImage
            : "/" + formattedImage)
      );
    }
  }, [user, baseUrl]);

  const formattedImage = user?.image
    ? user.image.replace(/^public/, "")
    : "/default-profile.png";

  // Handle image upload (only images allowed)
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

  // Certificate upload validations (PDF only)
  const handleBeforeUploadCertificate1 = (file) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed for Certificate 1!");
      return Upload.LIST_IGNORE;
    }
    setCertificate1File(file);
    return false;
  };

  const handleBeforeUploadCertificate2 = (file) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed for Certificate 2!");
      return Upload.LIST_IGNORE;
    }
    setCertificate2File(file);
    return false;
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      name: user?.name || "",
      service: user?.service || [],
      address: user?.address || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
    });
    if (user?.image && !file) {
      const formatted = user.image.replace(/^public/, "");
      setPreviewImage(
        baseUrl + (formatted.startsWith("/") ? formatted : "/" + formatted)
      );
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setFile(null);
    setCertificate1File(null);
    setCertificate2File(null);
    form.resetFields();
  };

  const handleEditFormSubmit = async (values) => {
    const formData = new FormData();
    // Append text fields (convert arrays to comma-separated strings)
    Object.keys(values).forEach((key) => {
      formData.append(
        key,
        Array.isArray(values[key]) ? values[key].join(",") : values[key]
      );
    });
    // Append new image if provided
    if (file) {
      formData.append("image", file);
    }
    // Append new certificate files (both use the same field name so backend receives an array)
    if (certificate1File) {
      formData.append("certificate", certificate1File);
    }
    if (certificate2File) {
      formData.append("certificate", certificate2File);
    }

    try {
      await updateUser(formData).unwrap();
      message.success("Profile updated successfully!");
      handleCloseModal();
    } catch (error) {
      message.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h3 className="text-2xl font-semibold">Provider Profile</h3>

      {/* Profile Display */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl p-12 relative">
        <button
          onClick={handleOpenEditModal}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Edit Profile
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
          alt="Provider Profile Image"
          className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full"
          width={256}
          height={256}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 mb-4">{user?.email}</p>
          <form className="w-full">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Service Category
                </label>
                <input
                  type="text"
                  value={user?.service ? user.service.join(", ") : ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Experience Certificate 1
                </label>
                {certificate1Url ? (
                  <a
                    href={certificate1Url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    View Certificate 1 (PDF)
                  </a>
                ) : (
                  <p className="text-gray-500">No certificate uploaded</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Experience Certificate 2
                </label>
                {certificate2Url ? (
                  <a
                    href={certificate2Url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    View Certificate 2 (PDF)
                  </a>
                ) : (
                  <p className="text-gray-500">No certificate uploaded</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={user?.address || ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={user?.city || ""}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={user?.postalCode || ""}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

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
            Edit Provider Profile
          </span>
        }
        visible={isEditModalOpen}
        onCancel={handleCloseModal}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={600}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleEditFormSubmit}
          className="space-y-4"
          initialValues={user}
        >
          {/* Profile Image Upload */}
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

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Service Category (Multiple Selection) */}
          <Form.Item
            label="Select Your Service Category"
            name="service"
            rules={[{ required: true, message: "Please select your service" }]}
          >
            <Select mode="multiple" placeholder="Choose service categories">
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
          </Form.Item>

          {/* Certificates side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Experience Certificate 1 (Optional)"
              name="certificate1"
            >
              <Upload
                maxCount={1}
                accept="application/pdf"
                beforeUpload={handleBeforeUploadCertificate1}
                showUploadList={!!certificate1File}
                fileList={
                  certificate1File
                    ? [
                        {
                          uid: "-1",
                          name: certificate1File.name,
                          status: "done",
                        },
                      ]
                    : []
                }
                onRemove={() => setCertificate1File(null)}
              >
                <Button icon={<FaPlus />}>Upload Certificate 1</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Experience Certificate 2 (Optional)"
              name="certificate2"
            >
              <Upload
                maxCount={1}
                accept="application/pdf"
                beforeUpload={handleBeforeUploadCertificate2}
                showUploadList={!!certificate2File}
                fileList={
                  certificate2File
                    ? [
                        {
                          uid: "-2",
                          name: certificate2File.name,
                          status: "done",
                        },
                      ]
                    : []
                }
                onRemove={() => setCertificate2File(null)}
              >
                <Button icon={<FaPlus />}>Upload Certificate 2</Button>
              </Upload>
            </Form.Item>
          </div>

          {/* Street Address */}
          <Form.Item
            label="Street Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Street address" />
          </Form.Item>

          {/* City & Postal Code in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="City" />
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
              <Input placeholder="Postal code" />
            </Form.Item>
          </div>

          {/* Save Changes Button */}
          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              className="w-full"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* pass chng */}

      <ChangePasswordModal
        visible={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      {/* Change Password Button */}
    </div>
  );
}
