import { Button, Form, Input, Modal } from "antd";
import { FaTimes } from "react-icons/fa";

export default function ChangePasswordModal({
  isChangePasswordModalOpen,
  setIsChangePasswordModalOpen,
  handleChangePassword,
}) {
  const [passwordForm] = Form.useForm();

  return (
    <>
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
    </>
  );
}
