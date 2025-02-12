"use client";

import {
  useAddBalanceMutation,
  useMyWalletQuery,
} from "@/redux/features/payment/paymentApi";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  InputNumber,
  List,
  Modal,
  Space,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

// Initial recent history data
const initialHistoryData = [
  {
    label: "Add Balance",
    amount: "+ $100",
    date: "18 Feb 2025, 10:00 AM",
    color: "green",
  },
  {
    label: "Confirm Order",
    amount: "- $100",
    date: "18 Feb 2025, 10:00 AM",
    color: "red",
  },
  {
    label: "Card Boost",
    amount: "- $1",
    date: "18 Feb 2025, 10:00 AM",
    color: "default",
  },
  {
    label: "Add Balance",
    amount: "+ $600",
    date: "18 Feb 2025, 10:00 AM",
    color: "green",
  },
  {
    label: "Confirm Order",
    amount: "- $200",
    date: "18 Feb 2025, 10:00 AM",
    color: "red",
  },
];

export default function Wallet() {
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [addBalanceForm] = Form.useForm();

  const { data } = useMyWalletQuery();
  // console.log(data?.data?.amount);

  const balance = data?.data?.amount;

  const [transactions, setTransactions] = useState(initialHistoryData);

  const [addBalance, { isLoading }] = useAddBalanceMutation();

  const openAddBalanceModal = () => setIsAddBalanceModalOpen(true);
  const closeAddBalanceModal = () => {
    setIsAddBalanceModalOpen(false);
    addBalanceForm.resetFields();
  };

  const handleAddBalanceFinish = async (values) => {
    const { balanceAmount } = values;

    try {
      // Make API call to add balance
      const response = await addBalance({ amount: balanceAmount }).unwrap();
      console.log(response);
      if (response?.success) {
        window.location.href = response?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Title level={2} className="text-center text-green-600 mb-12">
        Wallet
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
        {/* Left Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <div className="relative w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-md">
            {/* Icon */}
            <PlusOutlined style={{ fontSize: "3rem", color: "#52c41a" }} />
          </div>
          <Text type="secondary" className="text-lg font-medium">
            Available Balance
          </Text>
          <Title level={1} className="my-4">
            ${" "}
            {balance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4 w-full"
            onClick={openAddBalanceModal}
            loading={isLoading}
          >
            Add Some Balance
          </Button>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Title level={4} className="text-gray-800 mb-6">
            Recent History
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={transactions}
            renderItem={(item) => (
              <List.Item className="hover:bg-gray-50 rounded transition">
                <List.Item.Meta
                  title={<Text strong>{item.label}</Text>}
                  description={<Text type="secondary">{item.date}</Text>}
                />
                <Tag
                  color={
                    item.color === "green"
                      ? "green"
                      : item.color === "red"
                      ? "volcano"
                      : "default"
                  }
                  style={{ fontWeight: "bold" }}
                >
                  {item.amount}
                </Tag>
              </List.Item>
            )}
          />
        </div>
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
          onFinish={handleAddBalanceFinish}
          initialValues={{
            balanceAmount: 0,
          }}
        >
          <Form.Item
            label="Amount"
            name="balanceAmount"
            rules={[
              { required: true, message: "Please enter the amount to add" },
              {
                type: "number",
                min: 1,
                message: "Amount must be at least $1",
              },
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
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Add Balance
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
