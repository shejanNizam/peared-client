import baseApi from "@/redux/api/baseApi";

export const balanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  add balance
    addBalance: builder.mutation({
      query: (balanceData) => {
        return {
          url: "/payment/add-balance",
          method: "POST",
          body: balanceData,
        };
      },
      invalidatesTags: ["payment"],
    }),

    //  my wallet
    myWallet: builder.query({
      query: () => {
        return {
          url: "/payment/my-wallat",
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),

    //  recent payment history
    recentPaymentHistory: builder.query({
      query: () => {
        return {
          url: "payment/my-payment-history",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddBalanceMutation,
  useMyWalletQuery,
  useRecentPaymentHistoryQuery,
} = balanceApi;
