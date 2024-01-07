/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const PRODUK_API = "http://localhost:8000/api/produk";
const PHOTO_API = "http://localhost:8000/api/photo";

export default function PostProduk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produkResponse = await fetch(PRODUK_API);
        const produkData = await produkResponse.json();
        setProducts(produkData.data);

        const photoResponse = await fetch(PHOTO_API);
        const photoData = await photoResponse.json();
        setPhotos(photoData.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductPhotoUrl = (productId) => {
    const photo = photos.find((photo) => photo.ProductID === productId);
    return photo ? `http://localhost:8000${photo.URLFoto}` : "";
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-lg-8">
      {loading ? (
        <p>Loading...</p>
      ) : !products ? (
        <p>Tidak Ada Produk</p>
      ) : (
        currentProducts.map((product) => (
          <div className="item bor mb-20" key={product.ProductID}>
            <a
              href={`blog-single.html/${product.ProductID}`}
              className="image d-block mb-30"
            >
              <img
                src={getProductPhotoUrl(product.ProductID)}
                alt={product.NamaProduk}
                style={{ height: "250px", objectFit: "cover" }}
              />
            </a>
            <div className="d-flex align-items-center justify-content-between">
              <div className="info">
                <span>
                  Nama Produk :{" "}
                  <a href={`#0/${product.ProductID}`}>{product.NamaProduk}</a>
                </span>
                <span className="info_dot"></span>
                <span>
                  {new Date(product.TanggalDiposting).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
              </div>
              <div className="image-tag">
                <a href={`#0/${product.ProductID}`}>Edit</a>
                <a href={`#0/${product.ProductID}`}>{product.Status}</a>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="btn-tambahProduk mt-3 position-relative">
        <a
          href="/tambah-produk"
          className="btn btn-outline-dark position-absolute end-0 primary-color"
        >
          Tambah Produk Baru
        </a>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
