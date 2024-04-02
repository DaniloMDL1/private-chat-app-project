import { api } from "../api"
const CONVERSATIONS_URL = "/api/conversations"

export const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        newConversation: builder.mutation({
            query: (data) => ({
                url: `${CONVERSATIONS_URL}/new`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Conversations"]
        }),
        getConversations: builder.query({
            query: ({ userId }) => ({
                url: `${CONVERSATIONS_URL}/${userId}`,
                method: "GET",
            }),
            providesTags: ["Conversations"]
        })
    })
})

export const { useNewConversationMutation, useGetConversationsQuery } = conversationsApi