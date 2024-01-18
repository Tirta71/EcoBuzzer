import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_USER } from "../../../Api/ApiProfile";

export default function ProfileAcount() {
  const [userName, setUserName] = useState("");
  const UserID = localStorage.getItem("UserID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_USER}/${UserID}`);

        const { Nama } = response.data.data;

        setUserName(Nama);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="account d-flex align-items-center">
      <div className="user__icon">
        <a href="/profile-detail">
          <i className="fa-regular fa-user"></i>
        </a>
      </div>
      <a href="/profile-detail" className="acc__cont">
        <span>{userName}</span>
      </a>
    </div>
  );
}
