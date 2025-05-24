import { NextResponse } from "next/server";
import connectDB from "../../../../../mongodb/db";
import { Post } from "../../../../../mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";

export async function GET(request:Request, {params}:{params:{post_id:string}}){
    await connectDB();

    try {
        const post =await Post.findById(params.post_id);
        if (!post){
            return NextResponse.json({error:"Post not found"},{status:404});
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            {error:"An error occurred while fetchng the post"},
            {status:500}
        );
    }
} 

export interface DeletePostRequestBody {
    userId:string;
}
    

export async function DELETE(request:Request , {params}:{params:{post_id:string}}){
    const user = await currentUser();
        
        if (!user) {
            throw new Error("You are Unauthorized to do this task...");
        } else{
            await connectDB();

            const { userId } : DeletePostRequestBody = await request.json();
        

            
            try {
                const post = await Post.findById(params.post_id);

                if (!post) {
                    return NextResponse.json({error:"Post not found"},{status:404})
                }

                if (post.user.userId != userId){
                    throw new Error ('Post does not belong to the user');
                }

                await post.removePost();

                return NextResponse.json({message:"Post was deleted sucessfully !!!"})
                
            } catch (error) {
                return NextResponse.json(
                    {error:"An error occurred while deleting to post"},
                    {status:500}
                );
            }
        
        }
} 