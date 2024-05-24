export const GOOGLE_API_KEY = "AIzaSyA_9-a6HL5LNSRxRHlgwpE60GrTMFtXPrI";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&chart=mostPopular&maxResults=100&regionCode=In&key=" +
  GOOGLE_API_KEY;

export const COMMENT_SECTION_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=250&videoId=";

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const SEARCH_QUERY_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoDuration=medium&maxResults=150&type=video&key=" +
  GOOGLE_API_KEY +
  "&q=";

export const YOUTUBE_USER_DETAIL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2C%20statistics&key=" +
  GOOGLE_API_KEY +
  "&id=";

export const YOUTUBE_CHANNEL_SUBSCRIBER =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics%2C%20contentDetails&key=" +
  GOOGLE_API_KEY +
  "&id=";

  //https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics%2C%20contentDetails&id=UCYRY748zxmc_WNrnB6UzJpg&key=[YOUR_API_KEY]