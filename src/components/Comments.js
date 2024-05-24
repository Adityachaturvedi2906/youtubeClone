import React, { useState, useEffect } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { COMMENT_SECTION_API, GOOGLE_API_KEY } from "../utilities/constants";
import { useSearchParams } from "react-router-dom";

const Comments = () => {
  const [comments, setcomments] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getComments();
  }, []);
  const formatNumber = (num) => {
    if (num >= 1000) {
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

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };
  const getComments = async () => {
    const data = await fetch(
      COMMENT_SECTION_API + searchParams.get("v") + "&key=" + GOOGLE_API_KEY
    );
    const json = await data.json();
    setcomments(json.items);
  };
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">Comments</h1>
      {comments.map((comment, index) => (
        <div key={index}>
          <div className="flex my-7">
            <div>
              <img
                alt="profile"
                className="me-4 rounded-full"
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
              />
            </div>
            <div className="ml-2 w-10/12">
              <div>
                <span className="font-medium">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {getTimeDifference(
                    comment.snippet.topLevelComment.snippet.publishedAt
                  )}
                </span>
              </div>
              <div className="font-normal py-1">
                {comment.snippet.topLevelComment.snippet.textOriginal}
              </div>
              <div className="flex text-xl mt-1 items-center">
                <span className="cursor-pointer">
                  <BiLike />
                </span>
                <span className="text-sm ml-2 text-gray-700">
                  {formatNumber(
                    comment.snippet.topLevelComment.snippet.likeCount
                  )}
                </span>
                <span className="ml-5 cursor-pointer">
                  <BiDislike />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
