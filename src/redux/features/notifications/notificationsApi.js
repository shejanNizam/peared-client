import baseApi from "@/redux/api/baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // notifications
    allNotifications: builder.query({
      query: () => {
        return {
          url: "/notifications",
          method: "GET",
        };
      },
      providesTags: ["notifications"],
    }),
  }),
});

export const { useAllNotificationsQuery } = notificationsApi;
