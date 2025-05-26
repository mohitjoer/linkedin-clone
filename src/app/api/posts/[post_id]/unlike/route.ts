import { NextResponse } from "next/server";
import connectDB from "../../../../../../mongodb/db";
import { Post } from "../../../../../../mongodb/models/post";

export interface UnlikePostRequestBody {
  userId: string;
}

export async function POST(
  request: Request,
  context: { params: { post_id: string } }
) {
  const { post_id } = await Promise.resolve(context.params);
  await connectDB();

  const { userId }: UnlikePostRequestBody = await request.json();

  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(userId);
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while unliking the post" },
      { status: 500 }
    );
  }
}