import React from "react";

const VideoSuggestion = ({ data }) => {
  //   console.log(data);
  const { snippet, statistics } = data;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
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

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };
    const truncateTitle = (title) => {
      const maxLength = 50;
      return title.length > maxLength
        ? title.slice(0, maxLength) + "..."
        : title;
    };
    return (
      <div>
        <div className="flex items-start">
          <div className="w-56">
            <img
              className="my-2 rounded-lg"
              width={"94%"}
              alt="video"
              src={snippet.thumbnails.medium.url}
            />
          </div>
          <div className="w-64 overflow-x-hidden py-1">
            <h2 className=" text-sm font-semibold w-52">
              {truncateTitle(title)}
            </h2>
            <h2 className="text-sm text-gray-500 mt-1 font-normal">
              {snippet.channelTitle}
            </h2>
            <h4 className="text-sm text-gray-500 mt-1 font-normal">
              {formatNumber(statistics.viewCount)} views •{" "}
              {getTimeDifference(snippet.publishedAt)}
            </h4>
          </div>
        </div>
      </div>
    );
};

export default VideoSuggestion;
