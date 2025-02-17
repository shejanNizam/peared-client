"use client";
import { Button, Form, Input, Rate } from "antd";

export default function Feedback() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);
    form.resetFields();
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
        initialValues={{ rating: 5 }} // Default rating set to 5 stars
      >
        {/* Rating Field */}
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <div className="flex justify-center">
            <Rate />
          </div>
        </Form.Item>

        {/* Review Field with max 200 words */}
        <Form.Item
          label="Review"
          name="review"
          rules={[
            { required: true, message: "Please write a review!" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                // Count the words in the review text
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

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
