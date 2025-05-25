import connectDB from "../../mongodb/db";
import { Post } from "../../mongodb/models/post";
import { IPostDocument } from "../../mongodb/models/post";
import PostComponent from "./post";
import { Types } from "mongoose";

function serializePosts(posts: IPostDocument[]) {
  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    comments: post.comments?.map((comment) => ({
      _id: (comment._id as Types.ObjectId).toString(),
      text: comment.text,
      userId: comment.user.userId,
      userImage: comment.user.userImage,
      firstName: comment.user.firstName,
      lastName: comment.user.lastName,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    })) || [],
  }));
}

const PostFeed = async () => {
  await connectDB();

  let postsFromDb: IPostDocument[] = [];

  try {
    postsFromDb = await Post.find({}).lean();
  } catch (error) {
    console.error(error);
  }

  const posts = serializePosts(postsFromDb);

  if (!posts.length) {
    return <p className="text-center text-gray-400">No posts found</p>;
  }

  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <PostComponent key={post._id} post={post}/>
      ))}
    </div>
  );
};

export default PostFeed;