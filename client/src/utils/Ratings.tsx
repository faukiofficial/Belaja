import { FC } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type RatingsProps = {
  rating: number;
};

const Ratings: FC<RatingsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 > 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <AiFillStar key={index} className="text-yellow-500 text-2xl" />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <AiOutlineStar key={`half-${index}`} className="text-yellow-500 text-2xl" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <AiOutlineStar key={`empty-${index}`} className="text-gray-400 text-2xl" />
      ))}
    </div>
  );
};

export default Ratings;
