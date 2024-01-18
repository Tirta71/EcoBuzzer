import React, { useState, useEffect } from "react";
import axios from "axios";
import { KATEGORI_API, LOKASI_API } from "../../../../Api/ApiKategori";
import { CREATE_PRODUK } from "../../../../Api/ApiProduk";
import Swal from "sweetalert2";

const ChildTambahProduk = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [location, setLocation] = useState({ Kota: "", Provinsi: "" });
  const [kondisi, setKondisi] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [uniqueProvinces, setUniqueProvinces] = useState([]);

  const UserId = localStorage.getItem("UserID");

  useEffect(() => {
    axios
      .get(KATEGORI_API)
      .then((response) => {
        console.log("Categories:", response.data.data);
        setCategories(response.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get(LOKASI_API)
      .then((response) => {
        console.log("Locations:", response.data.data);

        // Filter unique provinces
        const uniqueProvincesSet = new Set(
          response.data.data.map((loc) => loc.Provinsi)
        );
        setUniqueProvinces([...uniqueProvincesSet]);

        setLocations(response.data.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedLocation = locations.find(
      (loc) => loc.Kota === location.Kota && loc.Provinsi === location.Provinsi
    );

    if (!selectedLocation) {
      console.error("Lokasi not found");
      return;
    }

    const data = {
      NamaProduk: productName,
      Deskripsi: productDescription,
      KategoriID: parseInt(category),
      Harga: parseInt(price),
      Status: status,
      UserID: UserId,
      LokasiID: selectedLocation.LokasiID,
      TanggalDiposting: new Date().toISOString().split("T")[0],
      Kondisi: kondisi,
    };

    axios
      .post(CREATE_PRODUK, data)
      .then((response) => {
        const newProductID = response.data.data.ProductID; // Perhatikan perubahan di sini
        localStorage.setItem("NewProductID", String(newProductID));

        console.log("API Response:", response.data);
        Swal.fire({
          title: "Success!",
          text: "Produk berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/tambah-photoProduk";
        });
      })
      .catch((error) => {
        let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
          console.error(
            "Server responded with non-2xx status:",
            error.response.data
          );
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received from server");
        } else {
          errorMessage = error.message || errorMessage;
          console.error("Error setting up the request:", error.message);
        }
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="container mt-200">
      <h3 className="text-center primary-color mb-3">Tambah Produk Baru</h3>
      <form onSubmit={handleFormSubmit} className="checkout__item-left ">
        <div className="form-group">
          <label htmlFor="productName">Nama Produk:</label>
          <input
            type="text"
            className="form-control w-100"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Deskripsi Produk:</label>
          <textarea
            className="form-control w-100"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            className="form-control w-100"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((kategori) => (
              <option key={kategori.KategoriID} value={kategori.KategoriID}>
                {kategori.NamaKategori}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Harga:</label>
          <input
            type="number"
            className="form-control w-100"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-control w-100 "
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Pilih Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="province">Provinsi:</label>
          <select
            className="form-control w-100"
            value={location.Provinsi}
            onChange={(e) =>
              setLocation({ ...location, Provinsi: e.target.value })
            }
            required
          >
            <option value="">Pilih Provinsi</option>
            {uniqueProvinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Kota:</label>
          <select
            className="form-control w-100"
            id="location"
            value={location.Kota}
            onChange={(e) => setLocation({ ...location, Kota: e.target.value })}
            required
          >
            <option value="">Pilih Kota</option>
            {locations
              .filter((loc) => loc.Provinsi === location.Provinsi)
              .reduce((uniqueCities, location) => {
                if (!uniqueCities.includes(location.Kota)) {
                  uniqueCities.push(location.Kota);
                }
                return uniqueCities;
              }, [])
              .map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="Kondisi">Kondisi:</label>
          <select
            className="form-control w-100"
            id="Kondisi"
            value={kondisi}
            onChange={(e) => setKondisi(e.target.value)}
            required
          >
            <option value="">Pilih kondisi</option>
            <option value="Baik">Baik</option>
            <option value="Rusak">Rusak</option>
            <option value="Sebagian Rusak">Sebagian Rusak</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-outline-dark mb-5 mt-5 primary-color w-100"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default ChildTambahProduk;
