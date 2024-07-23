import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Component to handle contacting the landlord of a listing
export default function Contact({ listing }) {
  // State variables to store landlord details and message
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  // Function to update the message state
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Effect hook to fetch landlord details when the listing's user reference changes
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        // Fetch landlord details from the API
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  // Render the component
  return (
    <>
      {/* Render the contact section only if landlord details are available */}
      {landlord && (
        <div className="flex flex-col gap-2">
          {/* Display landlord name and listing name */}
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>
            for
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          {/* Textarea to enter the message */}
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          {/* Link to compose email with pre-filled subject and body */}
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}