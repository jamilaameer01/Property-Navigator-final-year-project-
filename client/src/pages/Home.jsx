import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { motion } from "framer-motion";

export default function Home() {
  const [sliderListings, setSliderListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchSliderListings = async () => {
      try {
        const res = await fetch("/api/listing/get?sale=true&limit=6");
        const data = await res.json();
        setSliderListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=6");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=6");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchSliderListings();
  }, []);
  return (
    <div>
      {/* top */}

      <div className="mt-3 mb-3 bg-gradient-to-b from-slate-200 to-slate-500 flex shadow-lg">
        {/* Left */}

        <div className="flex flex-col gap-9 p-28 px-1 max-w-6xl mx-auto ">
          <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="font-bold text-3xl lg:text-6xl"
          >
            Discover your <span className="text-slate-500">perfect</span>
            <br />
            dream place
          </motion.h1>
          <div className="text-gray-300 text-xs sm:text-sm">
            Property Navigator is the best place to find your next perfect place
            to live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm font-bold hover:underline"
          >
            Let's get started...
          </Link>
        </div>

        {/* Right */}

        <div className="hidden sm:flex justify-center items-center p-6 mr-36">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="
              w-[25rem]
              h-[29rem]
              overflow-hidden
              rounded-[15rem_15rem_0_0]
              border-8 border-solid 
              border-[rgba(255,255,255,0.12)];"
          >
            <video
              className="w-full h-full object-cover opacity-65"
              autoPlay
              loop
            >
              <source src="./video.mp4 " />
            </video>
          </motion.div>
        </div>
      </div>

      {/* swiper */}

      <Swiper navigation style={{ height: "570px" }}>
        {sliderListings &&
          sliderListings.length > 0 &&
          sliderListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `url(${listing.imageUrls[0]}) center/cover no-repeat`,
                  borderRadius: "10px", // Rounded corners for better aesthetics
                  border: "3px solid #ccc", // Border style
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
