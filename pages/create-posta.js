import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "../src/graphql/mutations";
//removing this
// import dynamic from "next/dynamic";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });
// // import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
//removing this

const initialState = { title: "", content: "", siteid: "", count: "" };
function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content, siteid, count } = post;
  const router = useRouter();
  const [image, setImage] = useState(null);
  const imageFileInput = useRef(null);

  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!title || !content) return;
    const id = uuid;
    post.id = id;
    let entry = 0;

    if (!image) {
      alert("please upload an audio file");
    }

    if (image) {
      entry = 1;
      const filename = `${image.name}_${uuid()}`;
      post.coverImage = filename;
      await Storage.put(filename, image);
    }
    if (entry == 1) {
      await API.graphql({
        query: createPost,
        variables: { input: post },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      alert("post created");
    }
    //alert("post created");

    //router.push(`/posts/${id}`);
    //router.push("/");
  }

  async function uploadImage() {
    imageFileInput.current.click();
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Enter your survey details
          </h1>
          <p className="leading-relaxed mt-4">
            Enter required text fields and upload an audio file. Then click
            create-post and wait for popup to appear. You are done!
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-orange-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="text-gray-900 text-lg font-medium title-font mb-5">
            <br />
            <br />
            Create New Entry
          </h1>
          <input
            onChange={onChange}
            name="title"
            placeholder="State"
            value={post.title}
            className="border rounded-tl rounded-bl border-gray-100 w-48 px
        -4 py-2 text-gray-900"
          />
          <input
            onChange={onChange}
            name="content"
            placeholder="County"
            value={post.content}
            className="border rounded-tl rounded-bl border-gray-100 w-48 px
        -4 py-2 text-gray-900"
          />
          <input
            onChange={onChange}
            name="siteid"
            placeholder="SiteId"
            value={post.siteid}
            className="border rounded-tl rounded-bl border-gray-100 w-48 px
        -4 py-2 text-gray-900"
          />
          <input
            onChange={onChange}
            name="count"
            placeholder="Count"
            value={post.count}
            className="border rounded-tl rounded-bl border-gray-100 w-48 px
        -4 py-2 text-gray-900"
          />
          <input
            type="date"
            onChange={onChange}
            name="date"
            placeholder="Date"
            value={post.date}
            className="border rounded-tl rounded-bl border-gray-100 w-48 px
        -4 py-2 text-gray-900"
          />
          {image && <img src={URL.createObjectURL(image)} className="my-4" />}{" "}
          <input
            type="file"
            ref={imageFileInput}
            className="absolute w-0 h-0"
            onChange={handleChange}
          />
          <button
            type="button"
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={uploadImage}
          >
            Upload Audio File
          </button>{" "}
          <p className="text-xs text-gray-500 mt-3">
            After uploading audio file, now click Create Entry button
          </p>
          <br />
          <br />
          <button
            type="button"
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={createNewPost}
          >
            Create Entry
          </button>
        </div>
      </div>
    </section>
  );
}

export default withAuthenticator(CreatePost);
