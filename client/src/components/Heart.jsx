import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Heart = ({ propertyId, userId, onToggle }) => {
  const [isClicked, setIsClicked] = useState(
    localStorage.getItem(`favorite_${userId}_${propertyId}`) === "true"
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!currentUser || !currentUser._id) {
          console.log("User not logged in.");
          // Handle the case where the user is not logged in
          return;
        }
  
        const response = await fetch(`/api/user/${currentUser._id}`);
        const data = await response.json();
  
        if (!data || !data.favourites) {
          // console.log("Data or favorites not available.");
          // Handle the case where data or favorites are not available
          return;
        }
  
        const isPropertyFavorited = data.favourites.includes(propertyId);
        setIsClicked(isPropertyFavorited);
      } catch (error) {
        console.log("Error fetching favorites:", error);
      }
    };
  
    fetchFavorites();
  }, [userId, propertyId, currentUser]);

  const handleToggleFavourite = async () => {
    try {
      if (!currentUser || !currentUser._id) {
        console.log("User not logged in.");
        // Handle the case where the user is not logged in
        return;
      }

      const endpoint = isClicked ? "/remove" : "/add";
      const token = "YOUR_ACCESS_TOKEN"; // Replace with the actual token obtained from your server

      await fetch(`/api/listing${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, propertyId }),
      });

      setIsClicked(!isClicked);
      onToggle(propertyId, !isClicked);

      // Save the favorite state to localStorage
      localStorage.setItem(`favorite_${userId}_${propertyId}`, !isClicked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div>
      <FaHeart
        size={20}
        className={`cursor-pointer ${
          isClicked ? "text-red-500" : " text-gray-800"
        }`}
        onClick={handleToggleFavourite}
      />
    </div>
  );
};

export default Heart;
