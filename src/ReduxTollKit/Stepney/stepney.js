// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const stepneyApi = createApi({
  reducerPath: 'stepneyApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://stepney.onrender.com'}),
  endpoints: builder => ({
    signUpUser: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/customersignup/`,
          method: 'POST',
          body: body,
        };
      },
    }),
    otpConfirmation: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/customersignup/`,
          method: 'PUT',
          body: body,
        };
      },
    }),
    userLogIn: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: body => {
        return {
          url: `/customerlogin/`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpUserMutation,
  useOtpConfirmationMutation,
  useUserLogInMutation,
} = stepneyApi;
