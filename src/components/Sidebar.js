import React from "react";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // early pattern return
  if (!isMenuOpen) return null;
  return (
    <div className="p-5 mt-20">
      <ul>
        <div className="flex items-center my-2">
          <span className="mx-2 text-2xl">
            <IoMdHome />
          </span>
          <li className="text-lg">
            <Link to="/">Home</Link>
          </li>
        </div>
        <div className="flex items-center my-2">
          <span className="mx-2 text-xl">
            <SiYoutubeshorts />
          </span>
          <li className="text-lg">Shorts</li>
        </div>
        <div className="flex items-center my-2">
          <span className="mx-2 text-2xl">
            <MdOutlineVideoLibrary />
          </span>
          <li className="text-lg">Subscriptions</li>
        </div>
      </ul>
      {/* <h1 className="pt-5 font-bold">You</h1>
      <ul>
        <li>Your Channel</li>
        <li>Playlist</li>
        <li>Your Videos</li>
        <li>Watch Later</li>
        <li>Liked Videos</li>
      </ul>
      <h1 className="pt-5 font-bold">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul> */}
    </div>
  );
};

export default Sidebar;
