"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRef } from "react";
import { Button } from "./ui/button";
import { create } from "domain";
import createCommentAction from "../../actions/createcommentaction";

function CommentForm( { postId }: { postId: string }) {
  const { user } = useUser();
  
  const ref =useRef<HTMLFormElement>(null);

  const createCommentActionWithPostId = createCommentAction.bind(null, postId);
  
  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    
    const formDataCopy =formData;
    ref.current?.reset();

    try {
      await createCommentActionWithPostId(formDataCopy);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <form action={(formData)=>{
      const promise = handleCommentAction(formData);
    }}
    className="flex items-center space-x-2 mb-4" ref={ref}>

      <Avatar >
        <AvatarImage src={user?.imageUrl} className="h-8 w-8 rounded-full"/>
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 inline-flex items-center space-x-2">
        <input
          type="text"
          name="comment"
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" >
          comment
        </Button>
      </div>
    </form>
  )
}
export default CommentForm