"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TimeAgo from "react-timeago";
import { SerializedPost } from "./post";

interface CommentFeedProps {
  comments: SerializedPost["comments"];
}

function CommentFeed({ comments }: CommentFeedProps) {
  return (
    <div className="space-y-4 mt-4 px-4">
      {comments.map((comment) => (
        <div key={comment._id} className="flex space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName?.[0]}
              {comment.user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm">
                  {comment.user.firstName} {comment.user.lastName}
                </p>
                <span className="text-xs text-gray-500">
                  <TimeAgo date={comment.createdAt} />
                </span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentFeed;
