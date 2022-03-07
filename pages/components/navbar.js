import Link from "next/link";
import React from "react";
import "../../configureAmplify";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);

  useEffect(() => {
    authListener();
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);
        case "signOut":
          return setSignedUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {}
  }

  return (
    <nav className="pt-3 pb-3 space-x-4 border-b bg-amber-400 border-gray-300">
      <div className="max-w-6x1 mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <a
              href="#"
              className="flex items-center text-blue-700 font-medium text-2xl"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
              <span>NOBO Data</span>
            </a>
          </div>
          <div className="flex items-center space-x-1">
            {[
              ["Home", "/"],
              ["Create Post", "/create-posta"],
              ["Profile", "/profile"],
              ["Instruction", "/contact"],
              ["About", "/about"],
            ].map(([title, url], index) => (
              <Link href={url} key={index}>
                <a className="rounded-lg px-3 py-2 text-xl text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">
                  {" "}
                  {title}
                </a>
              </Link>
            ))}

            {signedUser && (
              <Link href="/my-postsa">
                <a className="rounded-lg px-3 py-2 text-xl text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">
                  My Posts
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
