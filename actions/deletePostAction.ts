"use server"

import { Post } from "../mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "../mongodb/db";
import { revalidatePath } from "next/cache";

export default async function deletePostAction(postId:string){
    await connectDB();
    const user = await currentUser();

    if (!user?.id){
        throw new Error ("User not authenticated");
    }


    const post = await Post.findById(postId);

    if(!post){
        throw new  Error ("Post not found");
    }

    if(post.user.userId !== user.id){
        throw new Error ("Post does not belong to the user ");
    }

    try{
        await Post.findByIdAndDelete(postId);
        revalidatePath("/posts");
    }catch(error){
        throw new Error ("an error occoured while deleting the post!!!")
    }
}