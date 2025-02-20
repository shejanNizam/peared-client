import baseApi from "@/redux/api/baseApi";

export const socketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch currently logged-in user's data
    getAllMessages: builder.query({
      query: (id) => ({
        url: `/chat/conversation/${id}`,
        method: "GET",
      }),
      providesTags: ["socket"],
    }),

    // getUserData: builder.query({
    //   query: () => ({
    //     url: "/user/my-profile",
    //     method: "GET",
    //   }),
    //   providesTags: ["auth"],
    // }),

    // // Update user data
    // updateUserData: builder.mutation({
    //   query: (data) => ({
    //     url: "/user/update",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["auth"],
    // }),
  }),
});

export const { useGetAllMessagesQuery } = socketApi;
