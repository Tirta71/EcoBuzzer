/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";

const ListProduk = () => {
  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/produk/")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:8000/api/photo")
      .then((response) => response.json())
      .then((data) => setPhotos(data.data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  const getProductPhotoUrl = (productId) => {
    const photo = photos.find((photo) => photo.ProductID === productId);
    return photo ? `http://localhost:8000${photo.URLFoto}` : "";
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <section className="product-area pb-130">
      <div className="container">
        <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
          <div
            className="section-header d-flex align-items-center wow fadeInUp"
            data-wow-delay=".1s"
          >
            <span className="title-icon mr-10"></span>
            <h2>latest arrival products</h2>
          </div>
          <ul className="nav nav-pills mt-4 mt-xl-0">
            <li className="nav-item wow fadeInUp" data-wow-delay=".1s">
              <a
                href="#latest-item"
                data-bs-toggle="tab"
                className="nav-link px-4 active"
              >
                latest item
              </a>
            </li>
          </ul>
        </div>
        {products && products.length > 0 ? (
          <div className="tab-content">
            <div id="latest-item" className="tab-pane fade show active">
              <div className="row g-4">
                {products
                  .filter((product) => product.Status !== "Sold")
                  .slice(0, 6)
                  .sort(
                    (a, b) =>
                      new Date(b.TanggalDiposting) -
                      new Date(a.TanggalDiposting)
                  )
                  .map((product) => (
                    <div
                      key={product.ProductID}
                      className="col-xxl-3 col-xl-4 col-md-6"
                    >
                      <div className="product__item bor">
                        <a
                          href={`/detail-category/detail-produk/${product.ProductID}`}
                          className="wishlist"
                        >
                          <i className="fa-regular fa-heart"></i>
                        </a>
                        <a
                          href={`/detail-category/detail-produk/${product.ProductID}`}
                          className="product__image pt-20 d-block"
                        >
                          <img
                            className="font-image"
                            src={getProductPhotoUrl(product.ProductID)}
                            alt="product image"
                            style={{
                              width: "280px",
                              height: "220px",
                              borderRadius: "10px",
                              objectFit: "center",
                            }}
                          />
                          <img
                            className="back-image"
                            src={getProductPhotoUrl(product.ProductID)}
                            style={{
                              width: "280px",
                              height: "220px",
                              borderRadius: "10px",
                              objectFit: "center",
                            }}
                            alt="back image"
                          />
                        </a>
                        <div className="product__content">
                          <h4 className="mb-15">
                            <a
                              className="primary-hover"
                              href={`detail-produk/${product.ProductID}`}
                            >
                              {product.NamaProduk}
                            </a>
                          </h4>
                          <div>
                            <i className="fas fa-calendar"></i>&nbsp;
                            {product.TanggalDiposting &&
                              new Date(
                                product.TanggalDiposting
                              ).toLocaleDateString("id-ID")}
                          </div>

                          <span className="primary-color ">
                            {formatCurrency(parseFloat(product.Harga))}
                          </span>
                        </div>

                        <a className="product__cart d-block bor-top" href="#0">
                          <i className="fa-regular fa-cart-shopping primary-color me-1"></i>
                          <span>Add to cart</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>Tidak ada Produk</p>
          </>
        )}
      </div>
    </section>
  );
};

export default ListProduk;
