"use client";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Space,
  Tag,
  Typography,
  message,
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
  // State for Add Balance Modal
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [addBalanceForm] = Form.useForm();

  // State for Change Card Modal
  // const [isChangeCardModalOpen, setIsChangeCardModalOpen] = useState(false); // remove
  const [changeCardForm] = Form.useForm();

  // State for balance and transactions
  const [balance, setBalance] = useState(12670.9);
  const [transactions, setTransactions] = useState(initialHistoryData);

  // Open and close functions for Add Balance Modal
  const openAddBalanceModal = () => setIsAddBalanceModalOpen(true);
  const closeAddBalanceModal = () => {
    setIsAddBalanceModalOpen(false);
    addBalanceForm.resetFields();
  };

  // Open and close functions for Change Card Modal
  // const openChangeCardModal = () => setIsChangeCardModalOpen(true); // remove
  const closeChangeCardModal = () => {
    setIsChangeCardModalOpen(false);
    changeCardForm.resetFields();
  };

  // Handle Add Balance form submission
  const handleAddBalanceFinish = (values) => {
    const { balanceAmount, cardName, cardNumber, expiryDate, ccv } = values;
    const newBalance = balance + Number(balanceAmount);
    setBalance(newBalance);

    // Update transactions
    const newTransaction = {
      label: "Add Balance",
      amount: `+ $${balanceAmount}`,
      date: new Date().toLocaleString(),
      color: "green",
    };
    setTransactions([newTransaction, ...transactions]);

    message.success("Balance added successfully!");
    closeAddBalanceModal();
  };

  // Handle Change Card form submission
  const handleChangeCardFinish = (values) => {
    const { cardName, cardNumber, expiryDate, ccv } = values;
    // Here you would typically update the card details in your backend or state management
    // For demonstration, we'll just log the values and show a success message
    console.log("Updated Card Details:", values);
    message.success("Card details updated successfully!");
    closeChangeCardModal();
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
            $
            {balance.toLocaleString(undefined, {
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
          >
            Add Balance
          </Button>
          {/* <Button
            type="default"
            size="large"
            className="w-full"
            onClick={openChangeCardModal}
          >
            Change Card
          </Button> */}
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

          <Form.Item
            label="Card Name"
            name="cardName"
            rules={[
              { required: true, message: "Please enter the cardholder's name" },
            ]}
          >
            <Input placeholder="e.g., John Doe" />
          </Form.Item>

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter the card number" },
              {
                pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                message: "Card number must be 16 digits",
              },
            ]}
          >
            <Input
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onChange={(e) => {
                const { value } = e.target;
                const formattedValue = value
                  .replace(/\D/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim();
                addBalanceForm.setFieldsValue({ cardNumber: formattedValue });
              }}
            />
          </Form.Item>

          <Space size="large" style={{ width: "100%" }}>
            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[
                { required: true, message: "Please select the expiry date" },
              ]}
            >
              <Input type="month" />
            </Form.Item>

            <Form.Item
              label="CCV"
              name="ccv"
              rules={[
                { required: true, message: "Please enter the CCV" },
                {
                  pattern: /^\d{3,4}$/,
                  message: "CCV must be 3 or 4 digits",
                },
              ]}
            >
              <Input.Password placeholder="123" maxLength={4} />
            </Form.Item>
          </Space>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={closeAddBalanceModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Balance
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Card Modal
      // <Modal
      //   title="Change Card"
      //   visible={isChangeCardModalOpen}
      //   onCancel={closeChangeCardModal}
      //   footer={null} // We'll handle buttons within the form
      //   destroyOnClose
      // >
      //   <Form
      //     form={changeCardForm}
      //     layout="vertical"
      //     onFinish={handleChangeCardFinish}
      //   >
      //     <Form.Item
      //       label="Card Name"
      //       name="cardName"
      //       rules={[
      //         { required: true, message: "Please enter the cardholder's name" },
      //       ]}
      //     >
      //       <Input placeholder="e.g., Jane Smith" />
      //     </Form.Item>

      //     <Form.Item
      //       label="Card Number"
      //       name="cardNumber"
      //       rules={[
      //         { required: true, message: "Please enter the card number" },
      //         {
      //           pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
      //           message: "Card number must be 16 digits",
      //         },
      //       ]}
      //     >
      //       <Input
      //         placeholder="1234 5678 9012 3456"
      //         maxLength={19}
      //         onChange={(e) => {
      //           const { value } = e.target;
      //           const formattedValue = value
      //             .replace(/\D/g, "")
      //             .replace(/(.{4})/g, "$1 ")
      //             .trim();
      //           changeCardForm.setFieldsValue({ cardNumber: formattedValue });
      //         }}
      //       />
      //     </Form.Item>

      //     <Space size="large" style={{ width: "100%" }}>
      //       <Form.Item
      //         label="Expiry Date"
      //         name="expiryDate"
      //         rules={[
      //           { required: true, message: "Please select the expiry date" },
      //         ]}
      //       >
      //         <Input type="month" />
      //       </Form.Item>

      //       <Form.Item
      //         label="CCV"
      //         name="ccv"
      //         rules={[
      //           { required: true, message: "Please enter the CCV" },
      //           {
      //             pattern: /^\d{3,4}$/,
      //             message: "CCV must be 3 or 4 digits",
      //           },
      //         ]}
      //       >
      //         <Input.Password placeholder="123" maxLength={4} />
      //       </Form.Item>
      //     </Space>

      //     <Form.Item>
      //       <Space className="w-full justify-end">
      //         <Button onClick={closeChangeCardModal}>Cancel</Button>
      //         <Button type="primary" htmlType="submit">
      //           Save Changes
      //         </Button>
      //       </Space>
      //     </Form.Item>
      //   </Form>
      // </Modal> */}
    </div>
  );
}
