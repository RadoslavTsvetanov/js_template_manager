import React, { useState } from 'react';

interface Data {
  name: string;
  content: string;
}

export const Template: React.FC<Data> = ({ name, content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const truncatedContent = content.length > 10 ? `${content.slice(0, 10)}...` : content;

  const handleSeeMoreClick = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="border p-4 rounded shadow-md my-4">
      <div className="text-lg font-bold mb-2">{name}</div>
      <div className="text-gray-700">
        {showFullContent ? content : truncatedContent}
        {content.length > 10 && (
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={handleSeeMoreClick}
          >
            {showFullContent ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    </div>
  );
};


