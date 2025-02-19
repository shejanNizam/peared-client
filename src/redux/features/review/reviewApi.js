import baseApi from "@/redux/api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    topReviews: builder.query({
      query: (id) => {
        return {
          url: `/provider/top-reviews/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    providerAllReviews: builder.query({
      query: () => {
        return {
          url: "/provider/my-review",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    addToFavourite: builder.mutation({
      query: (favData) => {
        return {
          url: "/provider/is-favourite",
          method: "POST",
          body: favData,
        };
      },
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useProviderAllReviewsQuery,
  useAddToFavouriteMutation,
  useTopReviewsQuery,
} = reviewApi;
