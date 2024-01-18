import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TAMBAH_LOKASI } from "../../../Api/ApiKategori";
import { API_REGISTER } from "../../../Api/ApiProfile";

export default function ContentRegister() {
  const [formData, setFormData] = useState({
    Nama: "",
    Email: "",
    Password: "",
    Alamat: "",
    NomorTelepon: "",
    Kota: "",
    Provinsi: "",
    KodePos: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Registrasi user
      const responseRegister = await axios.post(API_REGISTER, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Jika registrasi berhasil, tambahkan lokasi
      if (responseRegister.data.success) {
        const responseLocation = await axios.post(TAMBAH_LOKASI, {
          Kota: formData.Kota,
          Provinsi: formData.Provinsi,
        });

        console.log("Lokasi response:", responseLocation.data);
        // Tambahkan logika atau handle response lokasi di sini jika diperlukan
      } else {
        // Registrasi gagal, tampilkan pesan error
        const errors = responseRegister.data.data;

        Object.keys(errors).forEach((fieldName) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${fieldName}: ${errors[fieldName][0]}`,
          });
        });
      }

      // Set status registrasi untuk digunakan pada UI
      setRegistrationStatus(responseRegister.data);

      // Tampilkan pesan sukses atau error
      Swal.fire({
        icon: responseRegister.data.success ? "success" : "error",
        title: responseRegister.data.message,
      }).then((result) => {
        if (result.isConfirmed && responseRegister.data.success) {
          // Jika registrasi berhasil, arahkan ke halaman login
          window.location.href = "/login";
        }
      });
    } catch (error) {
      // Tangani kesalahan umum
      console.error("Error during registration:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  };

  useEffect(() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  }, []);

  return (
    <div className="col-xxl-4">
      <div className="login__content">
        <h2 className="text-white mb-65">Create Account</h2>
        <div className="form-area login__form">
          <form onSubmit={handleFormSubmit}>
            <input
              required
              type="text"
              placeholder="Full Name"
              name="Nama"
              value={formData.Nama}
              onChange={handleInputChange}
            />
            <input
              required
              className="mt-30"
              type="email"
              placeholder="Email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
            />
            <input
              required
              className="mt-30"
              type="password"
              placeholder="Enter Password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
            />

            <input
              required
              className="mt-30"
              type="text"
              placeholder="Alamat"
              name="Alamat"
              value={formData.Alamat}
              onChange={handleInputChange}
            />

            <input
              required
              className="mt-30"
              type="text"
              placeholder="Masukan No Wa"
              name="NomorTelepon"
              value={formData.NomorTelepon}
              onChange={handleInputChange}
            />
            <input
              required
              className="mt-30"
              type="text"
              placeholder="City"
              name="Kota"
              value={formData.Kota}
              onChange={handleInputChange}
            />
            <input
              required
              className="mt-30"
              type="text"
              placeholder="Province"
              name="Provinsi"
              value={formData.Provinsi}
              onChange={handleInputChange}
            />
            <input
              required
              className="mt-30"
              type="text"
              placeholder="Postal Code"
              name="KodePos"
              value={formData.KodePos}
              onChange={handleInputChange}
            />
            <button className="mt-30">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
