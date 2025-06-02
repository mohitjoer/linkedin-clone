"use server"

import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";
import { currentUser } from "@clerk/nextjs/server"
import { Post } from "../mongodb/models/post";
import { ICommentBase } from "../mongodb/models/comment";
import { revalidatePath } from "next/cache";
import { IUser } from "../types/user";

export default async function createCommentAction
    (postId:string ,formData: FormData) {
        const user = await currentUser();
        const commentInput = formData.get("comment")?.toString().trim();

        if (!postId)throw new Error("post id required");
        if(!commentInput) throw new Error ("comment input is required");
        if (!user?.id) throw new Error("user not authenticated");

        const userdb: IUser ={
            userId : user.id,
            userImage : user.imageUrl,
            firstName : user.firstName || "",
            lastName : user.lastName ||"",
        };

        const body : AddCommentRequestBody={
            user : userdb,
            text :commentInput,
        };


        const post = await Post.findById(postId);

        if(!post){
            throw new Error("post not found");
        }

        const comment : ICommentBase = {
            user:userdb,
            text : commentInput,
        }

        try {
            await post.commentOnPost(comment);
            revalidatePath("/");
        } catch (error) {
            throw new Error ("An error occurred while adding commment");
        }

}