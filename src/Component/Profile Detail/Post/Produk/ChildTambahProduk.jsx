import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const UserId = localStorage.getItem("UserID");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kategoris")
      .then((response) => {
        console.log("Categories:", response.data.data);
        setCategories(response.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("http://localhost:8000/api/lokasi")
      .then((response) => {
        console.log("Locations:", response.data.data);
        setLocations(response.data.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedLocation = locations.find(
      (loc) => loc.Kota === location.Kota
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
      LokasiID: selectedLocation.LokasiID, // Ambil LokasiID dari objek Lokasi yang ditemukan
      TanggalDiposting: new Date().toISOString().split("T")[0],
      Kondisi: kondisi,
    };
    console.log(selectedLocation);

    axios
      .post("http://localhost:8000/api/produk-create", data)
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Server responded with non-2xx status:",
            error.response.data
          );
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received from server");
        } else {
          console.error("Error setting up the request:", error.message);
        }
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
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Lokasi:</label>
          <select
            className="form-control w-100"
            id="location"
            value={location.Kota}
            onChange={(e) => setLocation({ ...location, Kota: e.target.value })}
            required
          >
            <option value="">Pilih Kota</option>
            {locations.map((location) => (
              <option key={location.id} value={location.Kota}>
                {location.Kota}
              </option>
            ))}
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
            {locations.map((location) => (
              <option key={location.id} value={location.Provinsi}>
                {location.Provinsi}
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
            <option value="Baik">Baik</option>
            <option value="Rusak">Rusak</option>
            <option value="Sebagian Rusak">Sebagian Rusak</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mb-5 mt-2">
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default ChildTambahProduk;
