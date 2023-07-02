"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import PromptCard from "./PromptCard";
import PromptCardOthers from "./PromptCardOthers";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((training) => (
        <PromptCardOthers
          key={training._id}
          training={training}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [providers, setProviders] = useState(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/training");
      const data = await response.json();
      setTrainings(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed mb-8">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required

        />
      </form> */}

      
      <div className="">
        {session?.user ? (
          <div className="flex flex-col gap-3 md:gap-5">
            <Link href="/profile" className="black_btn_lg">
              My Trainings
            </Link>
            <Link href="/create-training" className="outline_btn_lg">
              Create Training
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn_lg"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div>
        <h1 className="text-3xl mt-10">See other people trainings</h1>
        <PromptCardList data={trainings} handleTagClick={() => {}} />
      </div>
    </section>
  );
};

export default Feed;
