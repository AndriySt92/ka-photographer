interface ReviewCardProps {
  avatar: string;
  reviews: string[];
}

const ReviewCard = ({ avatar, reviews }: ReviewCardProps) => {
  return (
    <div className="mb-4 flex gap-1 last:mb-0 sm:mb-6">
      <div className="flex aspect-square h-10 items-center justify-center overflow-hidden sm:h-14">
        <img src={avatar} alt="User avatar" className="h-full w-full object-contain" />
      </div>
      <div className="mt-10 flex-1 space-y-2 sm:mt-14">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-center justify-center overflow-hidden">
            <img src={review} alt="User review" className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
