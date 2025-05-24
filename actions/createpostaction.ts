"use server"

import { currentUser ,auth} from "@clerk/nextjs/server"
import {IUser} from ".././types/user"
import { Post } from "../mongodb/models/post";
import { AddPostRequestBody } from "@/app/api/posts/route";

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
        if( image.size > 0 ){
             const body : AddPostRequestBody ={
                user:userDB ,
                text: postInput,
                // imageUrl:image_Url,
            }
            await Post.create(body);

        }else{
            const body : AddPostRequestBody ={
                user:userDB ,
                text: postInput,
                
            }
            await Post.create(body);
        }
    } catch (error:any) {
        throw new Error(`failed to create post ${error}`)    
    }

    //create post in database 
    

    //revaladiate path
    
}