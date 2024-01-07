import React from "react";

export default function ProfileAcount() {
  const userName = localStorage.getItem("userName");

  return (
    <div className="account d-flex align-items-center">
      <div className="user__icon">
        <a href="#0">
          <i className="fa-regular fa-user"></i>
        </a>
      </div>
      <a href="/profile-detail" className="acc__cont">
        <span>{userName}</span>
      </a>
    </div>
  );
}
