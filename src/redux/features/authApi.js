import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 0. join as provider
    joinAsProvider: builder.mutation({
      query: (providerData) => {
        console.log("MU DATA", providerData);
        return {
          url: "/user/join-provider",
          method: "POST",
          body: providerData,
        };
      },
    }),

    // 1. Get profile data
    profileData: builder.query({
      query: () => ({
        url: "user/my-profile",
        method: "GET",
      }),
    }),

    // 2. Signup
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),

    // 3. Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // 4. Forgot Password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/user/forget-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ body }) => ({
        url: "/user/reset-password",
        method: "POST",
        body,
      }),
    }),

    // 5. Verify Forget OTP
    verifyForgetOtp: builder.mutation({
      query: ({ otp }) => {
        return {
          url: "/user/verify-forget-otp",
          method: "POST",
          body: { otp },
        };
      },
    }),

    // 6. Resend OTP
    resendOtp: builder.mutation({
      query: (email) => ({
        url: `/user/resend?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),

    // 8. Verify Email
    verifyEmail: builder.mutation({
      query: (email) => ({
        url: `/user/verify-email?email=${encodeURIComponent(email)}`,
        method: "POST",
      }),
    }),

    // 9. Logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useJoinAsProviderMutation,
  useProfileDataQuery,
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgetOtpMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApi;
