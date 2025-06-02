import { NextResponse } from "next/server";
import { IUser } from "../../../../types/user"
import connectDB from "../../../../mongodb/db"; 
import { currentUser } from "@clerk/nextjs/server";
import { IPostBase ,Post  } from "../../../../mongodb/models/post";


export interface AddPostRequestBody {
    user:IUser;
    text:string;
    imageUrl?:string | null;
}

export async function POST(request:Request){
    const user = await currentUser();
    
    if (!user) {
        throw new Error("You are Unauthorized to do this task...");
    } else{

        try {
            await connectDB(); //connection to Database
            const { user, text , imageUrl } : AddPostRequestBody = await request.json();

            const postData : IPostBase = {
                user,
                text,
                ...(imageUrl && {imageUrl}),
            };

            const post = await Post.create(postData);
            return NextResponse.json({message:"Post created sucesssfully",post});
        } catch (error) {
            return NextResponse.json(
                {error: `An error occurred while creating the post ${error}`},
                {status:500}
            );
        }
    }
} 

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.getAllPosts();
    return NextResponse.json({posts});
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { error: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}


