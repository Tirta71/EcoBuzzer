import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { KATEGORI_API } from "../../Api/ApiKategori";

export default function HeaderDetailCategory() {
  const [kategori, setKategori] = useState({});
  const { KategoriID } = useParams();

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch(`${KATEGORI_API}/${KategoriID}`);
        const data = await response.json();
        setKategori(data.data);
      } catch (error) {
        console.error("Error fetching kategori:", error);
      }
    };

    fetchKategori();
  }, [KategoriID]);

  return (
    <>
      <div className="pb-20 bor-bottom shop-page-wrp d-flex justify-content-between align-items-center mb-65">
        <p className="fw-600">Category by {kategori.NamaKategori}</p>
        <div className="short">
          <select className="form-select" aria-label="Default select example">
            <option value="0">Short by popularity</option>
          </select>
        </div>
      </div>
    </>
  );
}
