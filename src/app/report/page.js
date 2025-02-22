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
import report_img from "../../assets/payment/report_img.png";

const { TextArea } = Input;

export default function Feedback() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [reportProvider, { isLoading }] = useReportProviderMutation();

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const onFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "images") {
        formData.append(key, values[key]);
      }
    });
    if (values.images && values.images.length > 0) {
      values.images.forEach((fileObj, index) => {
        formData.append(`images`, fileObj.originFileObj);
      });
    }
    setPendingData(formData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePaymentSuccess = async () => {
    try {
      setIsPaying(true);
      const response = await reportProvider(pendingData).unwrap();
      if (response?.statusCode === 200) {
        setIsModalVisible(false);
        SuccessSwal({
          title: "",
          text: "Feedback submitted successfully!",
        });
        router.push("/");
      }
    } catch (error) {
      message.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 text-gray-600 hover:text-gray-800 focus:outline-none z-30"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold">Report</h2>
          <p className="text-gray-600 mt-1">
            Provide your feedback or report below.
          </p>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-5"
        >
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
              maxCount={3}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>
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
            <Image src={report_img} alt="Payment" className="mx-auto" />
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
