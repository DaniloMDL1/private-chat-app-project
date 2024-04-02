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
        })
    })
})

export const { useUpdateProfileMutation } = usersApi