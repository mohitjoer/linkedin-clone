import { NextResponse } from "next/server";
import connectDB from "../../../../../mongodb/db";
import { Post } from "../../../../../mongodb/models/post";

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

    return NextResponse.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { error: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await post.removePost();
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { error: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}