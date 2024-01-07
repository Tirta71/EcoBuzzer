import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContentProfileDetail() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("UserID");

    if (storedUserID) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/${storedUserID}`
          );
          setUserData(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      <h4 className="mb-30">Profile Detail</h4>
      <ul className="right_list mb-40 ">
        <li>
          <a className="d-block pb-1 mb-2" href="#0">
            {userData?.Nama}
          </a>
        </li>
        <li>
          <a className="d-block pb-1 mb-2" href="#0">
            {userData?.Email}
          </a>
        </li>
        <li>
          <a className="d-block pb-1 mb-2" href="#0">
            {userData?.Alamat}
          </a>
        </li>
        <li>
          <a className="d-block pb-1 mb-2" href="#0">
            {userData?.Kota}
          </a>
        </li>
        <li>
          <a className="d-block pb-1 mb-2" href="#0">
            {userData?.KodePos}
          </a>
        </li>
        <div className="profile-btn text-left">
          <a
            href=""
            className="btn btn-secondary text-right"
            style={{ width: "80%" }}
          >
            Edit Profile
          </a>
        </div>
      </ul>
    </>
  );
}
