import baseApi from "@/redux/api/baseApi";

export const socketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 10 }) => ({
        url: `/chat/conversation/${conversationId}?page=${page}&limit=${limit}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["socket"],
    }),

    // getAllMessages: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }

    //     return {
    //       url: `/chat/conversation/${conversationId}`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["socket"],
    // }),
  }),
});

export const { useGetAllMessagesQuery } = socketApi;
