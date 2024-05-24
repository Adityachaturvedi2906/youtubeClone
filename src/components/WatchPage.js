import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utilities/appSlice";
import { useSearchParams } from "react-router-dom";
import useVideos from "../hooks/useVideos";
import Comments from "./Comments";
import VideoSuggestion from "./VideoSuggestion";
import { BiDislike, BiLike } from "react-icons/bi";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import {
  YOUTUBE_CHANNEL_SUBSCRIBER,
  YOUTUBE_USER_DETAIL,
} from "../utilities/constants";
import { RWebShare } from "react-web-share";
import Description from "./Description";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const { videos } = useVideos();
  const [userData, setUserData] = useState([]);
  const [userContent, setUserContent] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [likesCount, setLikesCount] = useState("");
  const [viewsCount, setViewsCount] = useState("");

  const dispatch = useDispatch();
  const paramId = searchParams.get("v");

  const getUserData = async () => {
    const response = await fetch(YOUTUBE_USER_DETAIL + paramId);
    const data = await response.json();
    setUserData(data.items);
    // console.log(data.items);

    if (data.items.length > 0) {
      const user = data.items[0];
      if (user && user.snippet) {
        setChannelId(user.snippet.channelId);
        setLikesCount(user.statistics.likeCount);
        setViewsCount(user.statistics.viewCount)
      }
    }
  };

  const getSubscriberCount = async () => {
    const response = await fetch(YOUTUBE_CHANNEL_SUBSCRIBER + channelId);
    const json = await response.json();
    // console.log(json.items);
    setUserContent(json.items);
  };

  // useEffect(() => {
  // }, [])

  useEffect(() => {
    getUserData();
    dispatch(closeMenu());
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    getSubscriberCount();
  }, [channelId]); // Runs when channelId is set

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num;
  };

  return (
    <div className="flex ml-16 mt-24">
      <div className="max-w-[960px]">
        <div>
          <iframe
            className="rounded-2xl object-cover"
            width="940"
            height="500"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?si=z_WuYs1WCTkI8Xi8"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          {userData &&
            userData.map((user) => (
              <div>
                <h2 key={user.id} className="py-3 text-xl font-bold">
                  {user.snippet.localized.title}
                </h2>
              </div>
            ))}
        </div>
        <div>
          {userContent &&
            userContent.map((content) => (
              <>
                <div
                  key={content.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex">
                    <div>
                      <img
                        className="w-11 rounded-full"
                        src={content.snippet.thumbnails.default.url}
                        alt="profile"
                      />
                    </div>
                    <div className="ms-2">
                      <h2 className="font-semibold text-base">
                        {content.snippet.localized.title}
                      </h2>
                      <h2 className="text-gray-600 text-xs">
                        {formatNumber(content.statistics.subscriberCount)}{" "}
                        subscribers
                      </h2>
                    </div>
                  </div>
                  <div className="mr-2 flex px-4">
                    <button className="p-2 ps-4 pe-3 rounded-s-full border-r-[1px] flex items-center border-spacing-y-10 border-gray-300 bg-gray-100">
                      <span>
                        <AiOutlineLike
                          style={{
                            width: "35px",
                            height: "20px",
                            color: "#3C3C3C",
                          }}
                        />
                      </span>
                      <span className="text-sm font-semibold">
                        {formatNumber(likesCount)}{" "}
                      </span>
                    </button>
                    <button className="p-2 pe-4 rounded-r-full bg-gray-100 flex items-center">
                      <AiOutlineDislike
                        style={{
                          width: "35px",
                          height: "20px",
                          color: "#3C3C3C",
                          transform: "scaleX(-1)",
                        }}
                      />
                    </button>
                    <RWebShare
                      data={{
                        text: "Web Share",
                        url:
                          "https://www.youtube.com/embed/" +
                          paramId +
                          "?si=z_WuYs1WCTkI8Xi8",
                        title: "Share",
                      }}
                    >
                      <button className="p-2 px-4 mx-4 rounded-full bg-gray-100 flex items-center">
                        <PiShareFatLight
                          style={{
                            width: "30px",
                            height: "20px",
                          }}
                        />
                        <span className="text-sm font-semibold"> Share</span>
                      </button>
                    </RWebShare>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div>
          <Description data={userData}/>
        </div>
        <div>
          <Comments />
        </div>
      </div>
      <div>
        {videos.map((video) => (
          <a key={video.id} href={"/watch?v=" + video.id}>
            <VideoSuggestion data={video} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
