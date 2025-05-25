"use client";

import Image from "next/image";
import { IPostDocument } from "../../mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import deletePostAction from "../../actions/deletePostAction";

type SerializedPost = {
  _id: string;
  text?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: string;
    firstName?: string;
    lastName?: string;
    userImage?: string;
  };
  comments: {
  _id: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}[];

};


const PostComponent = ({ post }: { post: SerializedPost }) => {

  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  return (
    <div className="bg-white rounded-md border">
      <div className="p-4 flex space-x-2">
        <div className="">
          <Avatar>
            <AvatarImage src={post.user.userImage} />
            <AvatarFallback>
              {post.user.firstName?.charAt(0)}
              {post.user.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-between flex-1">
          <div>
            <div>
              {post.user.firstName} {post.user.lastName}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  {" "}
                  (You)
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-400">
              @{post.user.firstName}
              {post.user.firstName} - {post.user.userId.toString().slice(-4)}
            </p>
            <p>
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
          {isAuthor && (
            <Button
              variant="outline"
              onClick={() => {
                // delete post
                const promise = deletePostAction(post._id.toString());
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>

      <div>
        <p className="px-4 pb-2 mt-2">{post.text}</p>

        {/* if image uploaded put it here... */}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post image"
            width={500}
            height={500}
            className="w-full mx-auto"
          />
        )}
      </div>
      {/* PostOptions */}

     
    </div>
  );
};

export default PostComponent ;