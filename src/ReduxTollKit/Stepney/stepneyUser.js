// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import API_URL from '../APIURL/ApiUrl';
// Define a service using a base URL and expected endpoints
export const stepneyUserDetailsApi = createApi({
  reducerPath: 'stepneyUserDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      // Get your authentication token from state (assuming you store it in Redux)
      // const token = getState().auth.token;
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNzg4MjQ0LCJpYXQiOjE2OTE5MjQyNDQsImp0aSI6ImNkYzNmMDc2NjcwYTQxNGRhYWIyY2NkOWY1MDg5NTFiIiwidXNlcl9pZCI6OH0.61psMxEEAbQzx5AhJDv-wOYIRRRZsEHoQUrZtYbSolg';
      console.log('token', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    updateUserProfile: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        console.log('ERRRODATE', body);
        return {
          url: `/updatecustomerprofile/`,
          method: 'PUT',
          body: body,
          // headers: {'Content-Type': 'application/json'},
        };
      },
    }),
    forgotPassword: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({body}) => {
        console.log('ERRRODATE', body);
        return {
          url: `/resetpassword/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
        };
      },
    }),
    placeOrder: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({body}) => {
        // console.log('ERRRODATE', body);
        return {
          url: `/order/`,
          method: 'POST',
          body: body,
          // headers: {'Content-Type': 'application/json'},
        };
      },
    }),
    getAllMechanics: builder.query({
      query: () => `/findmechanics/${'Gujranwala'}`,
    }),
    getAllFeedBack: builder.query({
      query: ({id}) => `/feedbacks/${id}`,
    }),
    getUserProfile: builder.query({
      query: () => `/profile/`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateUserProfileMutation,
  useGetAllMechanicsQuery,
  useGetAllFeedBackQuery,
  useForgotPasswordMutation,
  useGetUserProfileQuery,
  usePlaceOrderMutation,
} = stepneyUserDetailsApi;
