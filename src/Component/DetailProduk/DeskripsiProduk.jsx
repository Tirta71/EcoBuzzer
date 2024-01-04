import React from "react";

export default function DeskripsiProduk(product) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  return (
    <>
      <div className="content h24">
        <h3 className="pb-2 primary-color">{product.product.NamaProduk}</h3>
        <h2 className="pb-3">{formatCurrency(product.product.Harga)}</h2>
        <h4 className="pb-2 primary-color">Kondisi</h4>
        <p className="text-justify mb-10">{product.product.Kondisi}</p>
        <h4 className="pb-2 primary-color">Product Description</h4>
        <p className="text-justify mb-10">{product.product.Deskripsi}</p>
        <span
          className={`badge ${
            product.product.Status === "Available" ? "bg-primary" : "bg-danger"
          }`}
        >
          {product.product.Status}
        </span>
      </div>
    </>
  );
}
