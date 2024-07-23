import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import Heart from "./Heart";
import { useSelector } from "react-redux";

// ListingItem component for displaying individual listings
export default function ListingItem({ listing }) {
  const { currentUser } = useSelector((state) => state.user);

  // State to manage favorite listings
  const [favourites, setFavourites] = useState([]);

  // Function to handle toggling favorite status of a listing
  const handleToggleFavourite = (listingId, isFavourite) => {
    if (isFavourite) {
      // Add listingId to favourites if it's not already there
      setFavourites([...favourites, listingId]);
    } else {
      // Remove listingId from favourites
      setFavourites(favourites.filter((id) => id !== listingId));
    }
  };

  // Render ListingItem component
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      {/* Link to the detailed listing page */}
      <Link to={`/listing/${listing._id}`}>
        {/* Display listing cover image */}
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>

      {/* Listing details */}
      <div className="p-3 flex flex-col gap-2 w-full">
        {/* Listing name */}
        <p className="truncate text-lg font-semibold text-slate-700">
          {/* Link to the detailed listing page */}
          <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
        </p>
        {/* Location */}
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600 truncate w-full">
            {/* Link to the detailed listing page */}
            <Link to={`/listing/${listing._id}`}>{listing.address}</Link>
          </p>
        </div>
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {/* Link to the detailed listing page */}
          <Link to={`/listing/${listing._id}`}>{listing.description}</Link>
        </p>
        {/* Price */}
        <p className="text-slate-500 mt-2 font-semibold ">
          Rs {listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>

        {/* Bedroom and bathroom count */}
        <div className="text-slate-700 flex gap-4">
          <div className="font-bold text-xs">
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds `
              : `${listing.bedrooms} bed `}
          </div>
          <div className="font-bold text-xs">
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths `
              : `${listing.bathrooms} bath `}
          </div>
        </div>

        {/* Favourite button */}
        <div
          className={`
            flex 
            justify-center 
            items-center 
            bg-gray-300/60 
            hover:bg-gray-300/80 
            transition 
            rounded-md 
            ${listing.userRef === currentUser?._id ? "hidden" : ""}
          `}
        >
          {currentUser ? ( // If user is logged in
            <Heart
              propertyId={listing._id}
              userId={currentUser?._id}
              isFavourite={favourites.includes(listing._id)}
              onToggle={handleToggleFavourite}
            />
          ) : (
            // If user is not logged in, redirect to sign-in page
            <Link to={`/sign-in?from=${location.pathname}`}>
              <Heart />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
