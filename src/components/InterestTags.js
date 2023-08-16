import React from 'react';

const interests = ['Cricket', 'Football', 'Baseball', 'Running', 'Swimming', 'Cycling', 'Hiking', 'Gym', 'Yoga', 'Dancing', 'Cooking', 'Reading', 'Writing', 'Gaming', 'Painting', 'Music', 'Movies', 'Traveling'];

const InterestTags = () => {
  return (
    <div className="flex flex-wrap">
      {interests.map((interest, index) => (
        <span 
          key={index} 
          className="m-1 text-sm font-semibold text-gray-700 bg-blue-200 px-2 py-1 rounded-full">
          {interest}
        </span>
      ))}
    </div>
  );
}

export default InterestTags;
