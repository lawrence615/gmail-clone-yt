import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { logout, selectUser } from "./features/userSlice";
import "./Header.css";
import { auth, signOut } from "./services/firebase";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user.photoUrl);

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logout);
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png"
          alt=""
        />
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input placeholder="search mail" type="test" />
        <ArrowDropDownIcon />
      </div>
      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <Avatar onClick={onSignOut} src={user?.photoUrl}>
          {user?.displayName[0]}
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
