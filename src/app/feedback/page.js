"use client";
import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useFeedbackProviderMutation } from "@/redux/features/feedback/feedbackApi";
import { Button, Form, Input, Rate } from "antd";
import { useRouter } from "next/navigation";

export default function Feedback(props) {
  const router = useRouter();
  const { providerId } = props.searchParams;
  const [form] = Form.useForm();
  const [feedback, { isLoading }] = useFeedbackProviderMutation();

  const onFinish = async (values) => {
    const feedbackData = {
      ...values,
      providerId,
    };
    try {
      const response = await feedback(feedbackData).unwrap();
      console.log(response);
      SuccessSwal({
        title: "",
        text: response?.message,
      });
      form.resetFields();
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border border-gray-200 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Give your feedback
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ rating: 5 }}
      >
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <Rate className="custom-rate" />
        </Form.Item>
        <Form.Item
          label="Review"
          name="details"
          rules={[
            { required: true, message: "Please write a review!" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const wordCount = value
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word).length;
                if (wordCount > 300) {
                  return Promise.reject(
                    new Error("Review cannot exceed 300 words")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Write your review" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <style jsx>{`
        :global(.custom-rate .ant-rate-star-full .ant-rate-star-first) {
          color: yellow;
        }
      `}</style>
    </div>
  );
}
