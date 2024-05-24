import React from "react";
import { Link, useLocation } from "react-router-dom";
import useVideos from "../hooks/useVideos";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  console.log(searchResults);
  const { videos } = useVideos();

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num;
  };
  const getTimeDifference = (storedTime) => {
    const currentTime = new Date();
    const storedDateTime = new Date(storedTime);
    const timeDifference = currentTime - storedDateTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };
  return (
    <div className="mt-20 mx-20">
      {searchResults.map((result) => (
        <Link key={result.etag} to={"/watch?v=" + result.id.videoId}>
          <div key={searchResults.id}>
            <div className="my-5 flex">
              <div className="">
                <img
                  alt="banner"
                  width={result.snippet.thumbnails.high.width}
                  style={{ height: "260px" }}
                  className="rounded-xl hover:rounded-none max-w-fit"
                  src={result.snippet.thumbnails.medium.url}
                />
              </div>
              <div className=" mt-1">
                <h1
                  className="text-black text-lg font-semibold"
                  dangerouslySetInnerHTML={{ __html: result.snippet.title }}
                ></h1>
                <h2 className="text-gray-600 my-1 text-sm">
                  {getTimeDifference(result.snippet.publishedAt)}
                </h2>
                <h2 className="my-2 text-gray-600 text-sm">
                  {result.snippet.channelTitle}
                </h2>
                <h3 className="my-2 text-gray-600 text-sm">
                  {result.snippet.description}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
