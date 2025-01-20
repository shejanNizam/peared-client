"use client";

import CustomHeading from "@/components/utils/CustomHeading";
import { Button, Form, Input, message } from "antd";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  // Handle form submission
  const onFinish = (values) => {
    message.success("Message Sent!");
    // Here, you can integrate with your backend or email service
  };

  // Handle form submission failure
  const onFinishFailed = (errorInfo) => {
    message.error("Please check the form and try again.");
  };

  return (
    <section className="py-12">
      <div className="container mx-auto md:px-4">
        <div className="text-center">
          <CustomHeading> Contact Us </CustomHeading>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-4 justify-center items-center md:py-4 md:px-40">
          {/* Left Side - Contact Information */}

          <div className="p-8">
            <div className="flex items-start mb-6 p-2 bg-secondary border border-primary rounded ">
              <FaPhoneAlt className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-medium">Call Us</h3>
                <p className="text-gray-600">+(08) 255 201 888</p>
              </div>
            </div>
            <div className="flex items-start mb-6 p-2 bg-secondary border border-primary rounded ">
              <FaEnvelope className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-medium">Email Now</h3>
                <p className="text-gray-600">Hello@procleaning.com</p>
              </div>
            </div>
            <div className="flex items-start mb-6 p-2 bg-secondary border border-primary rounded ">
              <FaMapMarkerAlt className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-medium">Address</h3>
                <p className="text-gray-600">
                  7510, Brand Tower, New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className=" p-8">
            <Form
              name="contact_form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={<span className="text-black font-semibold"> Name </span>}
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-black font-semibold"> Email </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-black font-semibold"> Message </span>
                }
                name="message"
                rules={[
                  { required: true, message: "Please enter your message!" },
                ]}
              >
                <Input.TextArea rows={3} placeholder="Your Message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-primary text-white hover:bg-white hover:text-primary"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
