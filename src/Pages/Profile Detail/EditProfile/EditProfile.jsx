import React, { useState, useEffect } from "react";

import axios from "axios";
import HeaderHome from "../../../Component/Home/HeaderHome";
import MyNavbar from "../../../Component/Layout/MyNavbar";
import Swal from "sweetalert2";
import { API_USER } from "../../../Api/ApiProfile";

const EditProfile = () => {
  const UserID = localStorage.getItem("UserID");

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({
    Nama: "",
    Email: "",
    Alamat: "",
    Kota: "",
    KodePos: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${UserID}`
        );
        setUserData(response.data.data);
        setEditData({
          Nama: response.data.data.Nama,
          Email: response.data.data.Email,
          NomorTelepon: response.data.data.NomorTelepon,
          Alamat: response.data.data.Alamat,
          Kota: response.data.data.Kota,
          KodePos: response.data.data.KodePos,
          Provinsi: response.data.data.Provinsi,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [UserID]);

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_USER}/${UserID}`, editData);
      console.log("Edit Profile Response:", response.data);

      Swal.fire({
        title: "Success",
        text: "Profile Berhasil Di update",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile-detail";
        }
      });
    } catch (error) {
      console.error("Error editing user profile:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil.",
        text: "Silakan coba lagi nanti.",
      });
    }
  };

  return (
    <>
      <HeaderHome />
      <MyNavbar />
      <div className="container mt-200 pt-20">
        <h4 className="mb-30 primary-color">Edit Profile</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Nama" className="form-label">
              Nama:
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama"
              name="Nama"
              value={editData.Nama}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="Email"
              value={editData.Email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="NomorTelepon" className="form-label">
              Nomor Telepon:
            </label>
            <input
              type="text"
              className="form-control"
              id="NomorTelepon"
              name="NomorTelepon"
              value={editData.NomorTelepon}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Alamat" className="form-label">
              Alamat:
            </label>
            <input
              type="text"
              className="form-control"
              id="Alamat"
              name="Alamat"
              value={editData.Alamat}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Kota" className="form-label">
              Kota:
            </label>
            <input
              type="text"
              className="form-control"
              id="Kota"
              name="Kota"
              value={editData.Kota}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Provinsi" className="form-label">
              Provinsi:
            </label>
            <input
              type="text"
              className="form-control"
              id="Provinsi"
              name="Provinsi"
              value={editData.Provinsi}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="KodePos" className="form-label">
              Kode Pos:
            </label>
            <input
              type="text"
              className="form-control"
              id="KodePos"
              name="KodePos"
              value={editData.KodePos}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password (kosongkan jika tidak ingin mengganti):
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              name="Password"
              value={editData.Password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
