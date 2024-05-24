// useVideos.js
import { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utilities/constants';

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
        const response = await fetch(YOUTUBE_VIDEOS_API);
        const data = await response.json();
        setVideos(data.items);
        setLoading(false);
    };

    fetchVideos();

  }, []);

  return { videos, loading };
};

export default useVideos;
