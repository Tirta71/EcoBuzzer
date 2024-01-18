import React, { useEffect, useState } from "react";
import { API_USER } from "../../Api/ApiProfile";

export default function DeskripsiProduk({ product }) {
  const [sellerName, setSellerName] = useState("");
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_USER}/${product.UserID}`);
      const userData = await response.json();
      setSellerName(userData.data.Nama);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [product.UserID]);

  return (
    <>
      <div className="content h24">
        <h3 className="pb-2 primary-color">{product.NamaProduk}</h3>
        <h2 className="pb-3">{formatCurrency(product.Harga)}</h2>
        <h4 className="pb-2 primary-color">Kondisi</h4>
        <p className="text-justify mb-10">{product.Kondisi}</p>
        <h4 className="pb-2 primary-color">Product Description</h4>
        <p className="text-justify mb-10">{product.Deskripsi}</p>
        <h4 className="pb-2 primary-color">
          Penjual <span>{sellerName}</span>
        </h4>
        <span
          className={`badge ${
            product.Status === "Available" ? "bg-primary" : "bg-danger"
          }`}
        >
          {product.Status}
        </span>
      </div>
    </>
  );
}
