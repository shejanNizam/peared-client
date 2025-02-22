"use client";

"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useReportProviderMutation } from "@/redux/features/feedback/feedbackApi";
import payment_img from "../../assets/payment/payment_img.png";
// ^ Adjust import path to wherever your "reportProvider" is defined

const { TextArea } = Input;

export default function Feedback() {
  const router = useRouter();
  const [form] = Form.useForm();

  // Control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Temporary store for the form data before payment
  const [pendingData, setPendingData] = useState(null);

  // Payment loading state
  const [isPaying, setIsPaying] = useState(false);

  // RTK mutation for reportProvider
  const [reportProvider, { isLoading }] = useReportProviderMutation();

  // ============ IMAGE HANDLERS ============
  // Restrict uploads to image files
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    return false; // Prevent automatic upload
  };

  // ============ FORM SUBMIT ============
  const onFinish = (values) => {
    // Prepare FormData
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      // Exclude the 'images' field since it's stored differently
      if (key !== "images") {
        formData.append(key, values[key]);
      }
    });
    // Append image file(s) if available
    if (values.images && values.images.length > 0) {
      // For example, handle multiple images or just one
      values.images.forEach((fileObj, index) => {
        formData.append(`images`, fileObj.originFileObj);
      });
    }

    setPendingData(formData);
    setIsModalVisible(true);
  };

  // ============ MODAL ============
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ============ PAYMENT HANDLER ============
  const handlePaymentSuccess = async () => {
    try {
      setIsPaying(true);
      const response = await reportProvider(pendingData).unwrap();

      if (response?.statusCode === 200) {
        // Payment & submission success
        setIsModalVisible(false);
        SuccessSwal({
          title: "",
          text: "Feedback submitted successfully!",
        });
        router.push("/"); // redirect as needed
      }
    } catch (error) {
      // For example, handle insufficient wallet or other errors
      message.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    } finally {
      setIsPaying(false);
    }
  };

  // ============ UI ============
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 text-gray-600 hover:text-gray-800 focus:outline-none z-30"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold">Report</h2>
          <p className="text-gray-600 mt-1">
            Provide your feedback or report below.
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-5"
        >
          {/* Text Input */}
          <Form.Item
            label="Your Feedback"
            name="feedbackText"
            rules={[
              { required: true, message: "Please enter your feedback." },
              { min: 10, message: "At least 10 characters." },
            ]}
          >
            <TextArea rows={4} placeholder="Describe your feedback or report" />
          </Form.Item>

          {/* Images Upload */}
          <Form.Item
            label="Upload Screenshot / Images (optional)"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              name="feedbackImages"
              listType="picture"
              multiple
              beforeUpload={handleBeforeUpload}
              maxCount={3} // adjust as needed
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-green-500 hover:bg-green-600 border-none"
              loading={isLoading}
            >
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Payment Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-green-600 mb-2">
            Pay Now
          </h1>
          <p className="text-gray-600 mb-4">
            Please pay $25 to confirm your report submission.
          </p>
          <div className="text-4xl font-bold text-gray-800 mb-4">$25</div>

          <div className="mb-6">
            <Image src={payment_img} alt="Payment" className="mx-auto" />
          </div>

          <Button
            type="primary"
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
            onClick={handlePaymentSuccess}
            loading={isPaying}
          >
            Pay Now
          </Button>
        </div>
      </Modal>
    </div>
  );
}
