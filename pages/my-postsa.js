import { API, Auth } from "aws-amplify";
//import React, { useEffect } from 'react'
import { useState, useEffect } from "react";
import { postsByUsername } from "../src/graphql/queries";
import Link from "next/link";
import { deletePost as deletePostMutation } from "../src/graphql/mutations";

function MyPosts() {
  const d = new Date();
  var currDate;
  var futureDate;
  if ((d.getDate() < 10) & (d.getMonth() < 10)) {
    currDate =
      d.getFullYear() +
      "-" +
      "0" +
      (d.getMonth() + 1) +
      "-" +
      "0" +
      d.getDate();
    futureDate =
      d.getFullYear() +
      "-" +
      "0" +
      (d.getMonth() + 1) +
      "-" +
      "0" +
      d.getDate() +
      30;
  }
  if ((d.getDate() < 10) & (d.getMonth() >= 10)) {
    currDate =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate();
  }

  if ((d.getDate() >= 10) & (d.getMonth() < 10)) {
    currDate =
      d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  console.log(currDate);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { username } = await Auth.currentAuthenticatedUser();
    const postData = await API.graphql({
      query: postsByUsername,
      variables: {
        username,
        filter: { date: { between: [currDate, futureDate] } },
      },
    });
    setPosts(postData.data.postsByUsername.items);
  }

  async function deletePosts(id) {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    alert("Do you really want to delete");
    fetchPosts();
  }

  //   return (
  //     <div>
  //       <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
  //         My Posts
  //       </h1>
  //       {posts.map((post, index) => (
  //         <Link key={index} href={`/posts/${post.id}`}>
  //           <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
  //             <h2 className="text-xl font-semibold">{post.title}</h2>
  //             <p className="text-gray-500 mt-2">Author:{post.username}</p>
  //           </div>
  //         </Link>
  //       ))}
  //     </div>
  //   );

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={index}
          className="py-8 px-8 max-w-xxl mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-1 sm:flex 
          sm:items-center sm:space-y-0 sm:space-x-6 mb-2"
        >
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-black font-semibold">{post.title}</p>
              <p className="text-lg text-black font-semibold">{post.date}</p>
            </div>
            <div
              className="sm:py-4 sm:flex 
        sm:items-center sm:space-y-0 sm:space-x-1"
            >
              <p
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
    hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
    focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                <Link href={`/edit-posta/${post.id}`}>Edit Entry</Link>
              </p>

              <p
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
    hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
    focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                <Link href={`/posts/${post.id}`}>View Entry</Link>
              </p>

              <button
                className="text-sm mr-4 text-red-500"
                onClick={() => deletePosts(post.id)}
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
