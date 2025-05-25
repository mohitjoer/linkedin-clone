"use server"
import connectDB from "../mongodb/db";
import { currentUser } from "@clerk/nextjs/server"
import {IUser} from ".././types/user"
import { Post } from "../mongodb/models/post";
import { AddPostRequestBody } from "@/app/api/posts/route";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";
import { revalidatePath } from "next/cache";


export default async function createPostAction(formData:FormData) {
    const user = await currentUser();

    if (!user) {
        throw new Error("You are Unauthorized to do this task...");
    }

    const postInput = formData.get("postInput") as string ;
    const image = formData.get("image") as File;
    let imageUrl: string | undefined ;


    if(!postInput){
        throw new Error ("post input is required");
    }

    // define user
    const userDB :IUser ={
        userId:user.id,
        userImage:user.imageUrl,
        firstName: user.firstName ||"",
        lastName : user.lastName ||"",
    };

    // uplode img 

    try {
        await connectDB();

        if (image && image.size > 0) {
        const buffer = Buffer.from(await image.arrayBuffer());

        // Upload to Cloudinary
        imageUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: "posts" },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
            );

            // Convert buffer into readable stream
            Readable.from(buffer).pipe(stream);
        });
        }

        // Create post in MongoDB
        const postData: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl:imageUrl,
        };

        await Post.create(postData);
    } catch (error: any) {
        throw new Error(`Failed to create post: ${error.message}`);
    }
   
    

    //revaladiate path

    revalidatePath("/");
    
}