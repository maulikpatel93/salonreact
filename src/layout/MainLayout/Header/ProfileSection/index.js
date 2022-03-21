import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../../config";
import { store } from "store";
import { Logout } from "store/slices/authSlice";

const ProfileSection = () => {
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    // dispatch({ type: 'auth/logout'});
    if (store) {
      dispatch(Logout());
    } else {
      dispatch({ type: "auth/logout/fulfilled" });
    }
  };
  return (
    <>
      <div className="dropdown">
        <Link to="#" className="position-relative user-profile-icon ms-lg-4 ms-2 " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={currentUser && currentUser.profile_photo_url ? currentUser.profile_photo_url : config.imagepath + "Avatar.png"} alt="" />
          <span className="user-status online"></span>
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item">{currentUser.first_name + " " + currentUser.last_name}</a>
          <a className="dropdown-item">{currentUser.email}</a>
          <a className="dropdown-item cursor-pointer text-bold" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i>{t('Log Out')}
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
