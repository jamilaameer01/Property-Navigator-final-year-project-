import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-9 mt-24">
      <div className="container mx-auto">
        {/* Grid layout for footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Section 1: Branding and Contact */}
          <div className="flex flex-col">
            <Link to="/" className="text-xl font-bold mb-2">
              Property Navigator
            </Link>
            <p className="mb-2">A place for all your property needs.</p>
            <p className="mb-2">Phone number: 0311-1234567 </p>
            <p className="mb-2">Email: admin@gmail.com </p>
          </div>
          {/* Section 2: Explore Links */}
          <div>
            <h2 className="text-xl font-bold mb-2">Explore</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" target="_blank">About</Link>
              </li>
              <li>
                <Link to="/termsandconditions" target="_blank">
                  Terms And Conditions
                </Link>
              </li>
              <li>
                <Link to="/services" target="_blank">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          {/* Section 3: Social Media Links */}
          <div>
            <h2 className="text-xl font-bold mb-2">Connect</h2>
            <div className="flex space-x-4">
              {/* Social media links */}
              <Link to="https://www.github.com/zaratanveer" target="_blank">
                <BsGithub />
              </Link>
              <Link to="#" target="_blank">
                <BsInstagram />
              </Link>
              <Link to="#" target="_blank">
                <BsTwitter />
              </Link>
              <Link to="#" target="_blank">
                <BsFacebook />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer bottom section */}
      <div className="mt-6 border-t border-gray-700 pt-2 text-center">
        {/* Copyright information */}
        <p>
          &copy; {new Date().getFullYear()} Property Navigator. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
