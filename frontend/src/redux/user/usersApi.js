import { api } from "../api"
const USERS_URL = "/api/users"

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update/${data.userId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        searchUsers: builder.query({
            query: ({ searchTerm }) => ({
                url: `${USERS_URL}/search`,
                method: "GET",
                params: { searchTerm }
            }),
            providesTags: ["Users"]
        }),
        getUser: builder.query({
            query: ({ userId }) => ({
                url: `${USERS_URL}/${userId}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        })
    })
})

export const { useUpdateProfileMutation, useSearchUsersQuery, useGetUserQuery } = usersApi