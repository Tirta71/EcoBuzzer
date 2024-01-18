import React, { useState, useRef } from "react";
import HeaderHome from "../../../Component/Home/HeaderHome";
import MyNavbar from "../../../Component/Layout/MyNavbar";
import Swal from "sweetalert2";

const TambahPhotoProduk = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const newProductID = localStorage.getItem("NewProductID");

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];

    setPhoto(selectedPhoto);

    if (selectedPhoto) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(selectedPhoto);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("ProductID", newProductID);
    formData.append("URLFoto", photo);

    fetch("http://localhost:8000/api/photos/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("NewProductID");

        Swal.fire({
          title: "Success!",
          text: "Photo added successfully.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/profile-detail";
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="mt-200">
      <HeaderHome />
      <MyNavbar />
      <div className="container mt-5">
        <h2 className="text-center">Tambah Photo Produk</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Photo:
            </label>
            <input
              type="file"
              className="form-control"
              id="photo"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
          </div>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline-dark mb-5  primary-color "
            onClick={handleSubmit}
          >
            Tambah Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahPhotoProduk;
