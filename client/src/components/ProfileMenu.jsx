import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useSignOut from "../hooks/useSignOut";

export default function ProfileMenu() {
  // Custom hook to handle sign out functionality
  const { handleSignOut } = useSignOut();

  const { currentUser } = useSelector((state) => state.user);

  // State for managing menu anchor element
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Handle click to open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Render ProfileMenu component
  return (
    <div>
      {/* Button to trigger the menu */}
      <Button
        id="avatar-button"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "-0.5rem",
        }}
      >
        {/* User avatar */}
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            marginRight: "0.9rem",
          }}
        />
      </Button>
      {/* Profile menu */}
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
      >
        {/* Menu items */}
        <MenuItem onClick={handleClose}>
          {/* Conditional rendering based on user role */}
          {currentUser?.role === 0 ? (
            <Link to="/favourite">Favourite</Link>
          ) : (
            <Link to="/admin">Dashboard</Link>
          )}
        </MenuItem>
        {/* Render Users menu item only if currentUser.role is not 0 */}
        {currentUser.role !== 0 && (
          <MenuItem onClick={handleClose}>
            <Link to="/users">Users</Link>
          </MenuItem>
        )}
        {/* Sign out option */}
        <MenuItem onClick={handleSignOut}>Signout</MenuItem>
      </Menu>
    </div>
  );
}
