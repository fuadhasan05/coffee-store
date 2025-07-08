import { use, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const CoffeeDetails = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData();
  const [coffee, setCoffee] = useState(data);
  const navigate = useNavigate();

  const {
    name,
    price,
    quantity,
    photo,
    description,
    supplier,
    taste,
    likedBy,
    email,
    _id,
  } = coffee || {};
  console.log(data);

  const [liked, setLiked] = useState(likedBy?.includes(user?.email));
  const [likeCount, setLikeCount] = useState(likedBy?.length);
  // console.log("is liked? : ", liked);
  // console.log(coffee);

  useEffect(() => {
    setLiked(likedBy?.includes(user?.email));
  }, [likedBy, user]);

  //Handle Like & dislike
  const handleLike = () => {
    if (user?.email === email) return alert("You Like your coffee");

    axios
      .patch(`${import.meta.env.VITE_API_URL}/like/${_id}`, {
        email: user?.email,
      })
      .then((data) => {
        // console.log(data?.data);
        const isLiked = data?.data?.liked;
        // Update Liked state
        setLiked(isLiked);

        // update likeCount state
        setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle order
  const handleOrder = () => {
    if (user?.email === email) return alert("You order your coffee");
    const orderInfo = {
      coffeeId: _id,
      customerEmail: user?.email,
    };
    // save order info in db
    axios
      .post(`${import.meta.env.VITE_API_URL}/place-order/${_id}`, orderInfo)
      .then((data) => {
        console.log(data);
        setCoffee((prev) => {
          return { ...prev, quantity: prev.quantity - 1 };
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
      >
        &larr; Back
      </button>
      <div className=" rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full md:w-1/2 h-72 object-cover"
        />
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">
              {description || "No description provided."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="block text-gray-500">Supplier</span>
                <span className="font-semibold">{supplier || "N/A"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Taste</span>
                <span className="font-semibold">{taste || "N/A"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Quantity</span>
                <span className="font-semibold">{quantity || "N/A"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Price</span>
                <span className="font-semibold">${price || "N/A"}</span>
              </div>
              <p>Like: {likeCount}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleOrder}
                className="mt-4 px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
              >
                Order Now
              </button>
              <button
                onClick={handleLike}
                className="mt-4 px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded transition"
              >
                {liked ? "Liked" : "Like"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
