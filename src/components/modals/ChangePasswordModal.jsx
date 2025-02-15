"use client";

import { Button, Form, Input, message, Modal } from "antd";
import { FaTimes } from "react-icons/fa";

export default function ChangePasswordModal({ visible, onClose }) {
  const [form] = Form.useForm();

  // All change password functionality is inside this component
  const handleChangePassword = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    // Sample validations (replace with your actual logic or API call)
    if (oldPassword === "incorrect") {
      message.error("Old password is incorrect");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match");
      return;
    }

    message.success("Password changed successfully!");
    form.resetFields();
    if (onClose) onClose();
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-primary">
          {" "}
          Change Password{" "}
        </span>
      }
      visible={visible}
      onCancel={() => {
        form.resetFields();
        if (onClose) onClose();
      }}
      footer={null}
      centered
      destroyOnClose
      maskClosable
      closeIcon={<FaTimes size={20} />}
      width={400}
    >
      <Form layout="vertical" onFinish={handleChangePassword} form={form}>
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
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
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
  );
}
