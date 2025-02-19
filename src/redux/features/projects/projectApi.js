import baseApi from "@/redux/api/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add project for users
    addProject: builder.mutation({
      query: (projectData) => {
        return {
          url: "/project/create-project",
          method: "POST",
          body: projectData,
        };
      },
      invalidatesTags: ["projects"],
    }),

    // all projects for providers
    allProjects: builder.query({
      query: () => {
        return {
          url: "/project/my-all-project",
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    // my project for users in dashboard
    myProjects: builder.query({
      query: () => {
        return {
          url: "/project/my-project",
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    //  my project bits
    myProjectBits: builder.query({
      query: (id) => {
        return {
          url: `/project/bit-project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    //  my project bit details
    myProjectBitDetails: builder.query({
      query: (id) => {
        return {
          url: `/bit/single-project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    // project approved
    projectApproved: builder.mutation({
      query: (projectApproveId) => {
        return {
          url: `/bit/bit-project-approved/${projectApproveId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["projects"],
    }),

    // confirm project
    confirmProject: builder.query({
      query: (id) => {
        return {
          url: `/bit/confirm-project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    // bit/create-bit-project
    createBidProject: builder.mutation({
      query: (bidProjectData) => {
        return {
          url: `/bit/create-bit-project`,
          method: "POST",
          body: bidProjectData,
        };
      },
      invalidatesTags: ["projects"],
    }),
    //  current provider project
    currentProjects: builder.query({
      query: () => {
        return {
          url: `/bit/current-projects`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),
    //  pending bids project
    pendingBids: builder.query({
      query: () => {
        return {
          url: `/bit/pendings-bits`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    // project OK by use
    projectOkByUser: builder.mutation({
      query: (id) => {
        return {
          url: `/bit/workOkByUser/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["projects"],
    }),
    // project NOT OK by use
    projectNotOkByUser: builder.mutation({
      query: (id) => {
        return {
          url: `/bit/workNotOKByUser/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["projects"],
    }),
    // project DONE by provider
    projectDoneByProvider: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/bit/workOkByProvider/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useAllProjectsQuery,
  useMyProjectsQuery,
  useMyProjectBitsQuery,
  useMyProjectBitDetailsQuery,
  useProjectApprovedMutation,
  useConfirmProjectQuery,
  useCreateBidProjectMutation,
  useCurrentProjectsQuery,
  usePendingBidsQuery,
  useProjectOkByUserMutation,
  useProjectNotOkByUserMutation,
  useProjectDoneByProviderMutation,
} = projectApi;
