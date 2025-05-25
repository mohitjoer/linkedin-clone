import { IPostDocument } from "../../mongodb/models/post"
import Post from "./post"

function Postfeed({ posts }: { posts: IPostDocument[] | undefined }) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts to display.</div>;
  }

  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post key={post._id?.toString()} post={post} />
      ))}
    </div>
  );
}

export default Postfeed;
