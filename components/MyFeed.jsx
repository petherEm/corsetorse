"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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

const MyFeed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [trainings, setTrainings] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/trainings`);
      const data = await response.json();
      setTrainings(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList data={trainings} handleTagClick={() => {}} />
    </section>
  );
};

export default MyFeed;
