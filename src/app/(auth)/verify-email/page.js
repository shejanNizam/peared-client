"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useResendOtpMutation,
  useVerifyForgetOtpMutation,
} from "@/redux/features/authApi";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const VerifyEmail = () => {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(180);

  const [verifyForgetOtp, { isLoading }] = useVerifyForgetOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const inputRefs = useRef([]);

  const onChangeOtp = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const onKeyDownOtp = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onFinish = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      message.error("Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      const response = await verifyForgetOtp({
        otp: enteredOtp,
      }).unwrap();

      if (response.success) {
        SuccessSwal({
          title: "OTP Verified!",
          text: "Redirecting to reset password.",
        });

        localStorage.setItem("user_token", response?.data?.token);
        router.push(`/reset-password`);
      } else {
        message.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };
  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendDisabled) return;
    if (!email) {
      message.error("Email not found. Please go back and re-enter your email.");
      return;
    }

    try {
      await resendOtp(email).unwrap();
      message.success("A new OTP has been sent to your email.");

      setResendDisabled(true);
      setResendTimer(180);

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Resend OTP Error:", error?.message);
      message.error(
        error?.data?.message || "Failed to resend OTP. Please try again."
      );
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4 ">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Verify Your Email</h2>
          <p className="text-center text-gray-600 mt-2">
            Please enter the 6-digit OTP sent to your email address.
          </p>
        </div>

        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          <div className="flex justify-between space-x-4">
            {otp.map((digit, index) => (
              <Form.Item key={index} className="mb-0">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => onChangeOtp(index, e.target.value)}
                  onKeyDown={(e) => onKeyDownOtp(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="text-center w-16 h-16 text-2xl border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                  aria-label={`OTP Digit ${index + 1}`}
                />
              </Form.Item>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Didn’t receive the code?</span>
            <Button
              type="link"
              onClick={handleResendOtp}
              disabled={resendDisabled || resendLoading}
              className="text-green-500 hover:text-green-600"
            >
              {resendDisabled ? (
                <span className="text-red-500">
                  Resend OTP in {resendTimer}s
                </span>
              ) : (
                "Resend"
              )}
            </Button>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
