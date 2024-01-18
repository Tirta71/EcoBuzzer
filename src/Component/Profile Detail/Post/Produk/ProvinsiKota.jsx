import React, { useState } from "react";
import axios from "axios";

const ProvinsiKota = ({ onLokasiChange }) => {
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKota, setSelectedKota] = useState("");

  const handleProvinsiChange = (value) => {
    setSelectedProvinsi(value);
  };

  const handleKotaBlur = () => {
    axios
      .post("http://localhost:8000/api/lokasi/tambah", {
        Provinsi: selectedProvinsi,
        Kota: selectedKota,
      })
      .then((response) => {
        console.log("Data ditambahkan:", response.data);

        // Kirim Lokasi ID ke parent component
        onLokasiChange(response.data.data.LokasiID);
      })
      .catch((error) => {
        console.error("Error menambahkan data:", error);
      });
  };

  // Daftar provinsi di Indonesia
  const provincesInIndonesia = [
    "Aceh",
    "Bali",
    "Bangka Belitung",
    "Banten",
    "Bengkulu",
    "Gorontalo",
    "DKI Jakarta",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Kepulauan Riau",
    "Lampung",
    "Maluku",
    "Maluku Utara",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Papua",
    "Papua Barat",
    "Riau",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
    "Yogyakarta",
  ];

  return (
    <>
      <div className="form-group">
        <label htmlFor="province">Provinsi:</label>
        <select
          className="form-control w-100"
          value={selectedProvinsi}
          onChange={(e) => handleProvinsiChange(e.target.value)}
          required
        >
          <option value="">Pilih Provinsi</option>
          {provincesInIndonesia.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Kota:</label>
        <input
          type="text"
          className="form-control w-100"
          id="location"
          value={selectedKota}
          onChange={(e) => setSelectedKota(e.target.value)}
          onBlur={handleKotaBlur}
          required
        />
      </div>
    </>
  );
};

export default ProvinsiKota;
