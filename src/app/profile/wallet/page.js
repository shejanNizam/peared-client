"use client";

import RecentWalletHistory from "@/components/profile/wallet/RecentWalletHistory";
import WalletBalance from "@/components/profile/wallet/WalletBalance";
import {
  useAddBalanceMutation,
  useMyWalletQuery,
  useWithdrawBalanceMutation,
} from "@/redux/features/payment/paymentApi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

export default function Wallet() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [addBalanceForm] = Form.useForm();

  const [addBalance, { isLoading: addBalanceLoading }] =
    useAddBalanceMutation();
  const [withdrawBanalce, { isLoading: withdrawBalanceLoading }] =
    useWithdrawBalanceMutation();

  const { data } = useMyWalletQuery();
  const balance = data?.data?.amount;

  const openAddBalanceModal = () => setIsAddBalanceModalOpen(true);
  const closeAddBalanceModal = () => {
    setIsAddBalanceModalOpen(false);
    addBalanceForm.resetFields();
  };

  const handleAddBalanceFinish = async (values) => {
    const { balanceAmount } = values;

    try {
      const response = await addBalance({ amount: balanceAmount }).unwrap();
      console.log(response);
      if (response?.success) {
        window.location.href = response?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWithdrawBalanceFinish = async (values) => {
    const { balanceAmount } = values;

    try {
      const response = await withdrawBanalce({
        amount: balanceAmount,
      }).unwrap();
      console.log(response);
      if (response?.success) {
        window.location.href = response?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      <Title level={2} className="text-center text-green-600 mb-12">
        Wallet
      </Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center items-start">
        {/* Left Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center mx-auto">
          <WalletBalance balance={balance} />

          {user?.role === "provider" ? (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className="mb-4 w-full"
                onClick={openAddBalanceModal}
                loading={withdrawBalanceLoading}
              >
                Withdraw Balance
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className="mb-4 w-full"
                onClick={openAddBalanceModal}
                loading={addBalanceLoading}
              >
                Add Some Balance
              </Button>
            </>
          )}
        </div>

        {/* Right Section */}
        <RecentWalletHistory />
      </div>

      {/* Add Balance Modal */}
      <Modal
        title="Add Balance"
        visible={isAddBalanceModalOpen}
        onCancel={closeAddBalanceModal}
        footer={null} // We'll handle buttons within the form
        destroyOnClose
      >
        <Form
          form={addBalanceForm}
          layout="vertical"
          onFinish={
            user?.role === "provider"
              ? handleWithdrawBalanceFinish
              : handleAddBalanceFinish
          }
          initialValues={{
            balanceAmount: 0,
          }}
        >
          <Form.Item
            label="Amount"
            name="balanceAmount"
            rules={[
              { required: true, message: "Please enter the amount to add" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter amount to add"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={closeAddBalanceModal}>Cancel</Button>
              {user?.role === "user" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addBalanceLoading}
                >
                  Add Balance
                </Button>
              )}

              {user?.role === "provider" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={withdrawBalanceLoading}
                >
                  Withdraw Balance
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
