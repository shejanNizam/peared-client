import baseApi from "@/redux/api/baseApi";

export const socketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch currently logged-in user's data
    getAllMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 10 }) => ({
        // url: `/chat/conversation/${conversationId}/`,
        url: `/chat/conversation/${conversationId}?page=${page}&limit=${limit}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["socket"],
    }),

    // getStudios: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }

    //     return {
    //       url: `studio/get-studios/`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["studio"],
    // }),

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
