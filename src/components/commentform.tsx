"use client";

import { useUser } from "@clerk/nextjs";
import { IPostDocument } from "../../mongodb/models/post";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { SerializedPost } from "./post"; 

interface CommentFormProps {
    postId: string;
}


interface Comment {
    _id: string;
    text: string;
    userId: string; 
    createdAt: string;
    updatedAt: string;
}

function CommentForm({ postId }: CommentFormProps) {
    const { user } = useUser();
    const [post, setPost] = useState<SerializedPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
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

    const isAuthor = user?.id === post.user.userId;

    return (
        <div>
            {post.comments?.map((comment: Comment) => (
                <div key={comment._id} className="flex space-x-1">
                    <Avatar>
                        <AvatarImage src={comment.userId} /> 
                        <AvatarFallback>
                            {comment.userId.charAt(0)} 
                        </AvatarFallback>
                    </Avatar>
                </div>
            ))}
        </div>
    );
}

export default CommentForm;