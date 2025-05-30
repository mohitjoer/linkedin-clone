"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { SerializedPost } from "./post"; 
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";

interface CommentFormProps {
    postId: string;
}

function CommentFeed({ postId }: CommentFormProps) {
    const { user } = useUser();
    const [post, setPost] = useState<SerializedPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                console.log('Fetching post with ID:', postId);
                const response = await fetch(`/api/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                console.log('Received data:', data);
                setPost(data.post);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            {post.comments?.map((comment) => {
                const isAuthor = user?.id === comment.user.userId;

                return (
                    <div key={comment._id} className="flex space-x-2 mb-4">
                        <Avatar>
                            <AvatarFallback>
                                {comment.user.firstName?.charAt(0)}
                                {comment.user.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm">
                                        {comment.user.firstName} {comment.user.lastName}
                                        {isAuthor && (
                                            <Badge className="ml-2" variant="secondary">
                                                Author
                                            </Badge>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        @{comment.user.firstName}
                                        {comment.user.lastName}-
                                        {comment.user.userId.toString().slice(-4)}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    <ReactTimeago date={new Date(comment.createdAt)} />
                                </p>
                            </div>
                            <p className="mt-1 text-sm">{comment.text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CommentFeed;