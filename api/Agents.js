import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const endpoint = import.meta.env.VITE_HTTP_SERVER;

export const agentsApi = createApi({
  reducerPath: 'agentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  tagTypes: ['Agents'],

  endpoints: (builder) => ({
    getAllAgents: builder.query({
      query: () => '/agents',
      providesTags: ['Agents'],
    }),

    addAgent: builder.mutation({
      query: (newAgent) => ({
        url: '/agents',
        method: 'POST',
        body: newAgent,
      }),
      invalidatesTags: ['Agents'],
    }),

    updateAgent: builder.mutation({
      query: ({ id, formValue }) => ({
        url: `/agents/${id}`,
        method: 'PUT',
        body: formValue,
      }),
      invalidatesTags: ['Agents'],
    }),

    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/agents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agents'],
    }),
  }),
});

export const {
  useGetAllAgentsQuery,
  useAddAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation
} = agentsApi;