import React from 'react'

const VideoCard = ({ info }) => {
    // console.log(info);
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;
    const formatNumber = (num) => {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(0) + 'M';
        } else if (num >= 1000) {
          return (num / 1000).toFixed(0) + 'K';
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
          return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
      };
    return (
        <div className='p-2 m-2 w-96'>
            <img className='rounded-xl w-[30rem] hover:rounded-none' alt='video' src={thumbnails.medium.url}/>
            <ul className='overflow-hidden'>
                <li className='font-bold py-2'>{title}</li>
                <li className='text-gray-600'>{channelTitle}</li>
                <li className='text-gray-600'>{formatNumber(statistics.viewCount)} views • {getTimeDifference(publishedAt)}</li>
            </ul>
        </div>
    )
}

export default VideoCard