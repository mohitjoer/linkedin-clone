"use server"

import { currentUser } from "@clerk/nextjs/server"

export default async function createCommentAction
    (postId:string ,formData: FormData) {
        const user = await currentUser();
        const comment = formData.get("comment")?.toString().trim();
}