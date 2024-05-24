import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utilities/appSlice";
import { YOUTUBE_SEARCH_API, SEARCH_QUERY_API } from "../utilities/constants";
import { IoSearchOutline } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import { cacheResults } from "../utilities/searchSlice";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
// import LinearProgress from "@mui/material/LinearProgress";

// import AccountCircle from '@mui/icons-material/AccountCircle';

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdornment, setShowAdornment] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [suggestion, SetSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const handleQuery = (e) => setSearchQuery(e.target.value);

  // const handleCrossButton = () => {
  //   setSearchQuery("");
  //   setShowClose(false);
  // };

  useEffect(() => {
    // Calling API
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        SetSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    SetSuggestion(json[1]);

    // update
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Call the API
      const data = await fetch(SEARCH_QUERY_API + searchQuery);
      const json = await data.json();
      navigate("/results", { state: { searchResults: json.items } });
      setShowSuggestion(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      setSearchQuery(suggestion[focusedIndex]);
      setShowSuggestion(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <>
      {/* {loading && <LinearProgress variant="determinate" />} */}

      <div className=" p-4 fixed top-0 left-0 bg-scroll right-0 z-10 bg-white">
        <div className="grid grid-flow-col items-center">
          <div className="flex col-span-1 items-center">
            <img
              onClick={() => toggleMenuHandler()}
              className="h-8 mx-2 cursor-pointer"
              alt="menu"
              src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png"
            />
            <a href="/">
              <img
                className="h-6 mx-6 cursor-pointer"
                alt="youtube-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
              />
            </a>
          </div>
           <form className="col-span-6" onSubmit={handleSubmit}>
            <div className="relative ms-20">
              <OutlinedInput
                type="text"
                sx={{
                  height: "2.6em",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  paddingStart: "8px",
                  borderWidth: "1px",
                }}
                className="w-1/2 border border-gray-400 rounded-s-full focus:outline-none"
                placeholder="Search"
                startAdornment={
                  showAdornment && (
                    <InputAdornment position="start">
                      <IoSearchOutline />
                    </InputAdornment>
                  )
                }
                value={searchQuery}
                onChange={handleQuery}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setShowSuggestion(true);
                  setShowAdornment(true);
                }}
                onBlur={() => {
                  setShowSuggestion(false);
                  setShowAdornment(false);
                }}
              />
              <button
                type="submit"
                className="border border-gray-400 p-2 rounded-e-full bg-gray-100 border-l-0 px-4 absolute top-1/2 transform -translate-y-1/2"
              >
                <IoIosSearch className="w-6 h-6" />
              </button>
            </div>
            {showSuggestion && suggestion.length > 0 && (
              <div className="fixed ms-20 bg-white py-3 my-1 w-[33.5rem] shadow-lg border border-gray-200 rounded-xl">
                <ul>
                  {suggestion.map((s, index) => (
                    <li
                      key={s}
                      className={`py-2 ps-2 flex items-center hover:bg-gray-100 ${
                        index === focusedIndex ? "bg-gray-200" : ""
                      }`}
                    >
                      <span className="px-3">
                        <IoSearchOutline />
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          {/* <div className="col-span-1">
            <img
              className="h-8"
              alt="user"
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            />
          </div> */}
        </div>
        {/* <ButtonList /> */}
      </div>
    </>
  );
};

export default Head;
