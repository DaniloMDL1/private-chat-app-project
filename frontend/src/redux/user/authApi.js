import { api } from "../api"
const AUTH_URL = "/api/auth"

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/signout`,
                method: "POST"
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = authApi
