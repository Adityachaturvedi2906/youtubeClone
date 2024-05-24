// VideoContainer.js
import React from 'react';
import { Link } from 'react-router-dom';
import useVideos from '../hooks/useVideos';
import VideoCard from './VideoCard';

const VideoContainer = () => {
  const { videos, loading } = useVideos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-wrap mt-20'>
      {videos.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
