import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/admin/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.role === 1) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/admin/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    // Perform deletion
    try {
      await fetch(`/api/admin/delete/${selectedUserId}`, {
        method: "DELETE",
      });
      // Update UI after deletion
      setUsers(users.filter((user) => user._id !== selectedUserId));
      setShowConfirmation(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={handleCloseConfirmation}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto md:overflow-x-visible">
        <table className="w-full py-4 min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Date created
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                User image
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Username
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Email
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Admin
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white dark:border-gray-200 dark:bg-gray-200"
              >
                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.role === 1 ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="p-4">
                  <span
                    onClick={() => handleDeleteConfirmation(user._id)}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </Card>
  );
}
