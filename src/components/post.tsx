"use clint"

import { useUser } from "@clerk/nextjs"
import { IPostDocument } from "../../mongodb/models/post"
import { Avatar , AvatarImage , AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "@/components/ui/badge"
import ReactTimeago from "react-timeago";


function Post({post}:{ post : IPostDocument}) {
    const {user} = useUser();

    const isAuthor = user?.id === post.user.userId;
    return (
    <div className="bg-white rounded-md border">
        <div className="p-4 flex space-x-2">
            <div>
                <Avatar>
                    <AvatarImage src={post.user.userImage} className="h-10 w-10 rounded-full" />
                    <AvatarFallback>
                        {post.user.firstName?.charAt(0)} 
                        {post.user.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-between flex-1">
                <div>
                    <p className="font-semibold">
                        {post.user.firstName}{post.user.lastName}{" "}
                        {isAuthor &&(
                            <Badge className="ml-2" variant="secondary">
                                Author
                            </Badge>
                        )}
                    </p>
                    <p className="text-xs text-gray-400">
                        @{post.user.firstName}
                        {post.user.firstName}-{post.user.userId.toString().slice(-4)}
                    </p>
                    <p className="text-xs text-gray-400">
                        <ReactTimeago date={new Date(post.createdAt)}/>
                    </p>
                </div>

            </div>
        </div>
    </div>
  )
}
export default Post