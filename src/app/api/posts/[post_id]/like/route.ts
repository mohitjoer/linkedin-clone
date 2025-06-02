import { NextResponse } from "next/server";
import connectDB from "../../../../../../mongodb/db";
import { Post } from "../../../../../../mongodb/models/post";

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

    const likes = post.likes;
    return NextResponse.json(likes);
  } catch (err) {
    console.error("Error fetching likes:", err);
    return NextResponse.json(
      { error: "An error occurred while fetching likes" },
      { status: 500 }
    );
  }
}

export interface LikePostRequestBody {
  userId: string;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ post_id: string }> }
) {
  try {
    const { post_id } = await context.params;
    await connectDB();

    const { userId }: LikePostRequestBody = await request.json();

    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.likePost(userId);
    return NextResponse.json({ message: "Post liked successfully" });
  } catch (err) {
    console.error("Error liking post:", err);
    return NextResponse.json(
      { error: "An error occurred while liking the post" },
      { status: 500 }
    );
  }
}