import { useRecentPaymentHistoryQuery } from "@/redux/features/payment/paymentApi";
import { List, Tag, Typography } from "antd";
import { format } from "date-fns";

const { Title, Text } = Typography;

export default function RecentWalletHistory() {
  const { data } = useRecentPaymentHistoryQuery();
  const historyData = data?.data || [];

  const formattedTransactions = historyData.map((transaction) => {
    return {
      label: transaction.historyName,
      amount:
        transaction.paymentType === "deposit"
          ? `+ $${transaction.balance}`
          : `- $${transaction.balance}`,
      date: format(new Date(transaction.createdAt), "dd MMM yyyy, hh:mm a"),
      color: transaction.paymentType === "deposit" ? "green" : "red",
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full sm:w-96 mx-auto">
      <Title level={4} className="text-gray-800 mb-6">
        Recent History
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={formattedTransactions}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 rounded transition">
            <List.Item.Meta
              title={<Text strong>{item.label}</Text>}
              description={<Text type="secondary">{item.date}</Text>}
            />
            <Tag
              color={item.color === "green" ? "green" : "volcano"}
              style={{ fontWeight: "bold" }}
            >
              {item.amount}
            </Tag>
          </List.Item>
        )}
      />
    </div>
  );
}
