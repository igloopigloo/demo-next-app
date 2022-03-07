import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    setPosts(postData.data.listPosts.items);
  }

  return (
    <div className="container mx-auto rounded-lg shadow-lg mb-2 h-screen bg-bob flex flex-col sm:mx-8">
      <h1 className="container mx-auto text-sky-400 text-3xl font-bold underline">
        All Posts
      </h1>
      <div className="box-border h-85 w-85 p-4 border-4 border-indigo-500/100">
        {posts.map((post, index) => (
          <p
            className="text-center text-sky-400 text-1xl font-bold underline"
            key={index}
          >
            {post.content}
          </p>
        ))}
      </div>
    </div>
  );
}
