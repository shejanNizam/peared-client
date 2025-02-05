"use client"; // Enables client-side rendering for hooks and interactivity

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation"; // For Next.js App Router
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const VerifyEmail = () => {
  const router = useRouter(); // Initialize Next.js router
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [otp, setOtp] = useState(["", "", "", ""]); // State to hold each OTP digit

  // Refs for each input to manage focus
  const inputRefs = useRef([]);

  // Handle OTP input changes
  const onChangeOtp = (index, value) => {
    if (/^\d*$/.test(value)) {
      // Ensure only digits are entered
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input if value is entered
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key down events for navigation (e.g., Backspace)
  const onKeyDownOtp = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input if Backspace is pressed on empty field
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle form submission
  const onFinish = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      message.error("Please enter the complete 4-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace the mock submission with actual API call
      // Example:
      // const response = await fetch('/api/verify-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ otp: enteredOtp }),
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("Email verified successfully!");
      router.push("/reset-password"); // Navigate to Reset Password page after successful verification
    } catch (error) {
      console.error("Verify Email error:", error);
      message.error("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Resend OTP functionality
  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Replace the mock resend with actual API call
      // Example:
      // const response = await fetch('/api/resend-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      message.success("OTP has been resent to your email!");
      setOtp(["", "", "", ""]); // Reset OTP fields
      inputRefs.current[0].focus(); // Focus on the first input
    } catch (error) {
      console.error("Resend OTP error:", error);
      message.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-4 ">
      {/* Verify Email Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-semibold mt-4">Verify Your Email</h2>
          <p className="text-center text-gray-600 mt-2">
            Please enter the 4-digit OTP sent to your email address to verify
            your account.
          </p>
        </div>

        {/* OTP Form */}
        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          {/* OTP Input Fields */}
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

          {/* Didn't Receive Code & Resend Button */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Didnt receive the code?</span>
            <Button
              type="link"
              onClick={handleResend}
              disabled={isSubmitting}
              className="text-green-500 hover:text-green-600"
            >
              Resend
            </Button>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
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
