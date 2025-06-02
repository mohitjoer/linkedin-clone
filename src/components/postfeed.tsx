import connectDB from "../../mongodb/db";
import { Post } from "../../mongodb/models/post";
import { IPostDocument } from "../../mongodb/models/post";
import PostComponent from "./post";
import { Types } from "mongoose";
import { SerializedPost } from "./post";

function serializePosts(posts: IPostDocument[]): SerializedPost[] {
  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    comments: post.comments?.map((comment: any) => {
      // Check if comment and comment.user exist
      if (!comment || !comment.user) {
        return {
          _id: (comment?._id as Types.ObjectId)?.toString() || '',
          text: comment?.text || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            userId: 'deleted',
            firstName: 'Deleted',
            lastName: 'User',
            userImage: '',
          }
        };
      }

      return {
        _id: (comment._id as Types.ObjectId).toString(),
        text: comment.text,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        user: {
          userId: comment.user.userId,
          firstName: comment.user.firstName,
          lastName: comment.user.lastName,
          userImage: comment.user.userImage
        }
      };
    }) || [],
    user: {
      userId: post.user.userId,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      userImage: post.user.userImage
    }
  }));
}

const PostFeed = async () => {
  await connectDB();

  let postsFromDb: IPostDocument[] = [];

  try {
    // Properly populate nested user information for comments
    postsFromDb = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          select: 'userId firstName lastName userImage'
        }
      })
      .lean();
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