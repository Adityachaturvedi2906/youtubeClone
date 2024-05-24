import React, { useState } from "react";

const Description = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContainer = () => {
    setIsExpanded(!isExpanded);
  };
  //   console.log(data); // Check the structure of data

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const difference = now - date;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }
  };

  // Ensure data exists and has the expected structure
  if (!data || !data[0] || !data[0].statistics) {
    return <div>No data available</div>;
  }

  const { viewCount } = data[0].statistics;
  const { publishedAt, description } = data[0].snippet;

  return (
    <div
      className={`mt-4 bg-gray-100 p-4 me-7 rounded-lg ${
        isExpanded ? "h-full" : "h-20"
      }`}
    >
      <div>
        <div className="flex items-center">
          <h2 className="text-sm font-medium">
            {formatNumberWithCommas(viewCount)} views
          </h2>
          <h2 className="ms-2 text-sm font-medium">{timeAgo(publishedAt)}</h2>
        </div>
        <div className={isExpanded ? "block" : "hidden"}>
          <pre
            className="font-sans"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            {description}
          </pre>
        </div>
      </div>
      <button className="mt-3 font-semibold" onClick={handleContainer}>
        {isExpanded ? "Show less" : "...more"}
      </button>
    </div>
  );
};

export default Description;
