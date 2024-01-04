import React from "react";

import LogoImage from "../../assets/images/logo/logo.svg";
import Swal from "sweetalert2";
import ProfileAcount from "./ChildHeaderHome/ProfileAcount";

export default function HeaderHome() {
  const logout = () => {
    Swal.fire({
      title: "Sign Out",
      text: "Are you sure you want to Sign Out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("UserID");
        localStorage.removeItem("userName");

        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="top__header pt-30 pb-30">
      <div className="container">
        <div className="top__wrapper">
          <a href="/" className="main__logo">
            <img src={LogoImage} alt="logo__image" />
          </a>
          <div className="search__wrp">
            <input placeholder="Search for" aria-label="Search" />
            <button>
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
          <div className="account__wrap">
            <ProfileAcount />

            <div className="cart d-flex align-items-center">
              <span className="cart__icon">
                <i onClick={logout} className="fa-regular fa-sign-in"></i>
              </span>
              <a href="#" className="c__one">
                <span onClick={logout}>Sign Out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
