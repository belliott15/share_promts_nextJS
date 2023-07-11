"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard.jsx";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  //search state
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //filter function to find searched prompts, tags, and usernames
  const promptFilter = async (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  };

  //search function on input change
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = promptFilter(e.target.value);
        console.log(searchedResults);
        setSearchedResults(searchedResults);
      }, 1000)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
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
          required
          className="search_input peer"
        />
      </form>

      {/* conditional to display only certain prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
