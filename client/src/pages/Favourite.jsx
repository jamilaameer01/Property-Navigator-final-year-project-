import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteItem from "../components/FavouriteItem";

const Favorite = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `/api/listing/getfavourite/${currentUser._id}`
        );
        const data = await response.json();

        if (data.success) {
          setFavorites(data.favourites);
          setLoading(false);
        } else {
          setError("Unable to fetch favorite listings");
          setLoading(false);
        }
      } catch (error) {
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser._id]);

  const handleToggleFavourite = (listingId) => {
    // Implement logic to remove the item from favorites and database
    // For now, let's just log a message
    console.log(`Removing item ${listingId} from favorites and database`);
    // Update the favorites list by filtering out the removed favorite
    setFavorites(favorites.filter((favorite) => favorite._id !== listingId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Your Favorite Listings</h1>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <div key={favorite._id}>
            <FavoriteItem
              listing={favorite}
              favorite={favorite}
              onRemoveFavorite={handleToggleFavourite}
              onToggle={handleToggleFavourite}
              className="p-4 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
