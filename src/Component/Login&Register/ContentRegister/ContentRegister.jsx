import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === false && response.data.data) {
        const errors = response.data.data;

        Object.keys(errors).forEach((fieldName) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${fieldName}: ${errors[fieldName][0]}`,
          });
        });
      }

      // Move the registration status and response.data success/error Swal.fire outside the else block
      setRegistrationStatus(response.data);

      Swal.fire({
        icon: response.data.success ? "success" : "error",
        title: response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Sudah ada atau Ada kesalahan dalam mengisi form",
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
              placeholder="No Telepon"
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
