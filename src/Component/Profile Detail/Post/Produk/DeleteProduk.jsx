import React from "react";

export default function DeleteProduk({ product }) {
  return (
    <>
      <div className="image-tag">
        <a href={`edit-produk/${product.ProductID}`}>Edit</a>
        <a href={`edit-produk/${product.ProductID}`}>{product.Status}</a>
      </div>
    </>
  );
}
