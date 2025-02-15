"use client";

import { useChangePasswordMutation } from "@/redux/features/authApi";
import { Button, Form, Input, message, Modal } from "antd";
import { FaTimes } from "react-icons/fa";
import { ErrorSwal, SuccessSwal } from "../utils/allSwalFire";

export default function ChangePasswordModal({ visible, onClose }) {
  const [form] = Form.useForm();

  const [changePass, { isLoading }] = useChangePasswordMutation();

  // All change password functionality is inside this component
  const handleChangePassword = async (values) => {
    console.log(values);

    try {
      const response = await changePass(values).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message,
      });
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || error?.data?.message,
      });
      // message.error(error?.message || error?.data?.message);
    }

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
