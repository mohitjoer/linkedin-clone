'use client'

import { useEffect, useState } from "react"
import { SignedIn, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import CommentFeed from "./commentfeed"; 
import { SerializedPost } from "./post";
import CommentForm from "./commentform";


function PostOption({ post }: { post: SerializedPost }) {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<string[]>(post.likes || []);


    useEffect(() => {
        if (user?.id && post.likes?.includes(user.id)) {
            setLiked(true);
        } else {
            setLiked(false); 
        }
    }, [post, user, post.likes]);


    const likeOrUnlikePosts = async () => {
        if (!user?.id) {
            throw new Error("user not authenticated");
        }

        const originalLiked = liked;
        const originalLikes = likes;


        const newLikes = liked ? likes?.filter((like) => like !== user.id)
            : [...(likes ?? []), user.id];

        const body: LikePostRequestBody | UnlikePostRequestBody = {
            userId: user.id,
        };

        setLiked(!liked);
        setLikes(newLikes);

        try {
            const response = await fetch(`/api/posts/${post._id}/${liked ? "unlike" : "like"}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to like or unlike post");
            }

            const fetchLikeResponse = await fetch(`/api/posts/${post._id}/like`);

            if (!fetchLikeResponse.ok) {
                throw new Error("Failed to fetch likes");
            }

            const newLikeData = await fetchLikeResponse.json();
            setLikes(newLikeData);
        } catch (err: unknown) {
            setLiked(originalLiked);
            setLikes(originalLikes);
            console.error("Error liking/unliking post:", err);
        }
    };
    return (
        <div>
            <div className="flex justify-between p-4">
                <div>
                    {likes && likes.length > 0 && (
                        <p className="text-xs text-gray-500 cursor-pointer hover:underline">
                            {likes.length} likes
                        </p>
                    )}
                </div>

                <div>
                    {post?.comments && post.comments.length > 0 && (
                        <p onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                            className="text-xs text-gray-500 cursor-pointer hover:underline">
                            {post.comments.length} comments
                        </p>
                    )}

                </div>
            </div>

            <div className="flex flex-row justify-between px-2 pb-1 border-t">
                <Button onClick={likeOrUnlikePosts} variant="ghost" className="flex justify-center flex-1" >
                    <ThumbsUpIcon className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")} />
                    Like
                </Button>

                <Button 
                    variant="ghost" 
                    className="flex justify-center flex-1"
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                >
                    <MessageCircle className={cn("mr-1", isCommentsOpen && "text-[#4881c2] fill-[#4881c2]")} />
                    comment
                </Button>

                <Button variant="ghost" className="flex justify-center flex-1" >
                    <Repeat2 className="mr-1" />
                    repost
                </Button>

                <Button variant="ghost" className="flex justify-center flex-1" >
                    <Send className="mr-1" />
                    send
                </Button>
            </div>

            {isCommentsOpen && (
                <div className="p-4">
                    <SignedIn>
                        <CommentForm postId={post._id} />
                    </SignedIn>

                    <CommentFeed postId={post._id} />
                </div>
            )}
        </div>
    )
}
export default PostOption;