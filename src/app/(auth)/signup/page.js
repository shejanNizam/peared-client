"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { useSignupMutation } from "@/redux/features/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [signup, { isLoading }] = useSignupMutation();

  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();
      console.log(response);

      dispatch(
        setCredentials({
          user: response?.data?.user,
          // token: response?.data?.token,
        })
      );

      SuccessSwal({
        title: "Account created successfully!",
        text: "Please log in.",
      });

      router.push("/login");
    } catch (error) {
      ErrorSwal({
        title: "Signup failed!",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          " Please try again later.",
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 md:p-16 mt-[-100px] relative">
        <button
          onClick={handleBack}
          className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-secondary">
            Create Your Account
          </h2>
        </div>

        {/* Signup Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          {/* User Information Fields */}
          <div className="grid grid-cols-1">
            {/* Name */}
            <Form.Item
              label={<span className="text-black font-semibold"> Name </span>}
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Enter your name" size="large" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label={<span className="text-black font-semibold"> Email </span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                { required: true, message: "Please enter your valid email" },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={
                <span className="text-black font-semibold"> Password </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label={
                <span className="text-black font-semibold">
                  {" "}
                  Confirm Password{" "}
                </span>
              }
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                size="large"
              />
            </Form.Item>
          </div>

          {/* I Agree Checkbox */}
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              I have read & agreed to Peared{" "}
              <Link href="/terms-of-use">
                <span className="text-primary">Terms of Use</span>
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy">
                <span className="text-primary">Privacy Policy</span>
              </Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full transition-colors"
            >
              Create Account
            </Button>
          </Form.Item>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
