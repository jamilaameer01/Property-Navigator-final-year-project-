import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container mx-auto my-10 p-8 bg-slate-100 rounded-lg shadow-md">
      <motion.div
        initial={{ x: "7rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "ease-in",
        }}
        className="flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 md:mr-8 mb-4 md:mb-0">
          <video className="w-full h-full object-cover" autoPlay loop>
            <source src="./about.mp4" />
          </video>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-slate-800 text-center p-3  capitalize italic">
            Property Navigator
          </h2>
          <p className="text-slate-700 text-lg  text-justify p-3">
            Property Navigator is a leading real estate agency that specializes
            in helping clients buy properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the process as smooth as
            possible.Our mission is to help our clients achieve their real
            estate goals by providing expert advice, personalized service, and a
            deep understanding of the local market. Whether you are looking to
            buy, sell, or rent a property, we are here to help you every step of
            the way.Our team of agents has a wealth of experience and knowledge
            in the real estate industry, and we are committed to providing the
            highest level of service to our clients. We believe that buying or
            selling a property should be an exciting and rewarding experience,
            and we are dedicated to making that a reality for each and every one
            of our clients.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
