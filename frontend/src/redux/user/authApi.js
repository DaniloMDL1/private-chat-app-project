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
        })
    })
})

export const { useSignUpMutation } = authApi
