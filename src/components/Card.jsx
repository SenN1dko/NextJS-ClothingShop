import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useChangeRating } from '../hooks/useChangeRating';
export const Card = ({ id, product }) => {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const isLong = product.description.length > 40;
  const shortText = product.description.slice(0, 40);

  const { rating } = product;

  const mutation = useChangeRating({
    id,
    rate: rating.rate,
    countOfRating: rating.count,
  });

  const handleRating = (newVote) => {
    mutation.mutate(newVote);
  };
  return (
    <>
      <div className="flex flex-col  ease-in max-w-[250px] w-full bg-white rounded-lg overflow-hidden ">
        <img
          className="bg-gray-100/90 rounded-xl w-full h-52 object-contain"
          src={product.image}
          alt="product"
        />
        <div className="flex-grow item-center flex-col mb-2">
          <div className="flex  justify-between my-2">
            <p className="text-2xl font-bold">{product.price} ₸</p>

            <div className="flex flex-col">
              <Rating
                onClick={handleRating}
                initialValue={0}
                size={20}
                allowHover
                transition
                fillColor="#ffd700"
                emptyColor="#ccc"
              ></Rating>
              <div className="flex  justify-center gap-2">
                <span className=" font-medium text-gray-600">
                  ({product.rating.count})
                </span>
                <span className="text-gray-600">{rating.rate.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <h2 className="font-medium ">{product.title}</h2>
          {/* <p>
            {isLong && !isFullDescription ? (
              <>
                {shortText}
                {'  '}
                <button
                  className="text-blue-600 text-2xl cursor-pointer"
                  onClick={() => setIsFullDescription(true)}
                >
                  ...
                </button>
              </>
            ) : (
              <>
                {product.description}
                {'  '}
                <button
                  className="text-blue-600 text-2xl cursor-pointer"
                  onClick={() => setIsFullDescription(false)}
                >
                  ...
                </button>
              </>
            )}
          </p> */}
        </div>
        <button className="p-2 bg-yellow-300 font-bold hover:bg-yellow-400 transition-colors duration-150 cursor-pointer ease-in">
          Add to Cart
        </button>
      </div>
    </>
  );
};
