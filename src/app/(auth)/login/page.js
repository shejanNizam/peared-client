"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import { useLoginMutation } from "@/redux/features/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      localStorage.setItem("user_token", response?.data?.token);

      dispatch(
        setCredentials({
          user: response?.data?.user,
          token: response?.data?.token,
        })
      );

      SuccessSwal({
        title: "Login successful!",
        text: "Welcome to Peared!",
      });

      router.push("/profile/my-profile");
    } catch (error) {
      ErrorSwal({
        title: "Login failed!",
        text: `${error?.data?.message}`,
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <div className="bg-white shadow-2xl rounded-2xl rounded-tl-[8rem] md:rounded-tl-[10rem] rounded-br-[8rem] md:rounded-br-[10rem] w-full max-w-xl p-8 md:p-16 mt-[-200px] relative">
        <button
          onClick={handleBack}
          className="absolute top-12 left-16 text-gray-500 hover:text-gray-900 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-secondary">
            Login
          </h2>
        </div>

        {/* Login Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <div className="grid grid-cols-1">
            {/* Email Field */}
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

            {/* Password Field */}
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
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox className="text-green-500">Remember me</Checkbox>
            </Form.Item>
            <Link href="/forgot-password" className="text-primary">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full hover:bg-primary transition-colors"
            >
              Login
            </Button>
          </Form.Item>

          {/* Navigation Link to Signup Page */}
          <p className="text-center">
            {"Don't have an account?"}
            <Link href="/signup" className="text-primary">
              {" "}
              Create Account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
