import connectDB from "../../mongodb/db";
import { Post } from "../../mongodb/models/post";
import { IPostDocument } from "../../mongodb/models/post";
import PostComponent from "./post";
import { SerializedPost } from "./post";
import { Types } from "mongoose";

interface SerializedComment {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    userImage: string;
  };
}

function serializePosts(posts: IPostDocument[]): SerializedPost[] {
  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    comments: post.comments?.map((comment) => {
      const typedComment = comment as unknown as { 
        _id: Types.ObjectId;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        user: {
          userId: string;
          firstName?: string;
          lastName?: string;
          userImage?: string;
        };
      };

      if (!typedComment || !typedComment.user) {
        return {
          _id: '',
          text: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            userId: 'deleted',
            firstName: 'Deleted',
            lastName: 'User',
            userImage: ''
          }
        };
      }

      return {
        _id: typedComment._id.toString(),
        text: typedComment.text,
        createdAt: typedComment.createdAt.toISOString(),
        updatedAt: typedComment.updatedAt.toISOString(),
        user: {
          userId: typedComment.user.userId,
          firstName: typedComment.user.firstName || '',
          lastName: typedComment.user.lastName || '',
          userImage: typedComment.user.userImage || ''
        }
      } as SerializedComment;
    }) || [],
    user: {
      userId: post.user.userId,
      firstName: post.user.firstName || '',
      lastName: post.user.lastName || '',
      userImage: post.user.userImage || ''
    }
  }));
}

const PostFeed = async () => {
  await connectDB();
  let postsFromDb: IPostDocument[] = [];

  try {
    postsFromDb = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: 'comments',
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
        <PostComponent key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;