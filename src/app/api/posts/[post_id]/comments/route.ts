import { NextResponse } from "next/server";
import { Post } from "../../../../../../mongodb/models/post";
import connectDB from "../../../../../../mongodb/db";
import { ICommentBase } from "../../../../../../mongodb/models/comment";
import { IUser } from "../../../../../../types/user";

export async function GET(
  _request: Request,
  context: { params: Promise<{ post_id: string }> }
) {
  try {
    const { post_id } = await context.params;
    await connectDB();

    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error handling comments:", err);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ post_id: string }> }
) {
  try {
    const { post_id } = await context.params;
    await connectDB();
    
    const { user, text }: AddCommentRequestBody = await request.json();

    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (err) {
    console.error("Error handling comments:", err);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}