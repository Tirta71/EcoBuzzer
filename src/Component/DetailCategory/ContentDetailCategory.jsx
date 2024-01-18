import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUK_CATEGORI } from "../../Api/ApiProdukBYkategori";
import { PHOTO_API } from "../../Api/ApiPhoto";
import { LOKASI_API } from "../../Api/ApiKategori";
import SortByLocation from "./SortByLocation";

const ContentDetailCategory = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { KategoriID } = useParams();
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUK_CATEGORI}/${KategoriID}`);
        const data = await response.json();
        setOriginalProducts(data.data);
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch(PHOTO_API);
        const data = await response.json();
        setPhotos(data.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await fetch(LOKASI_API);
        const data = await response.json();
        setLocations(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchProducts();
    fetchPhotos();
    fetchLocations();
  }, [KategoriID]);

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

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSort = () => {
    if (selectedCity !== "0") {
      // Melakukan sorting produk berdasarkan nama kota
      const sortedProducts = originalProducts.filter((product) => {
        const productLocation = locations.find(
          (location) => location.LokasiID === product.LokasiID
        );
        return (
          productLocation &&
          productLocation.Kota.toLowerCase() === selectedCity.toLowerCase()
        );
      });

      setProducts(sortedProducts);
    } else {
      setProducts(originalProducts);
    }
  };

  return (
    <section className="product-area pb-130">
      <SortByLocation
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        locations={locations}
        handleSort={handleSort}
      />
      <div className="container">
        {products && products.length > 0 ? (
          <div className="tab-content">
            <div id="latest-item" className="tab-pane fade show active">
              <div className="row g-4">
                {products
                  .filter((product) => product.Status !== "Sold")
                  .map((product) => {
                    const productLocation = locations.find(
                      (location) => location.LokasiID === product.LokasiID
                    );

                    return (
                      <div
                        key={product.ProductID}
                        className="col-xxl-3 col-xl-4 col-md-6"
                      >
                        <div className="product__item bor">
                          <a
                            href={`detail-produk/${product.ProductID}`}
                            className="wishlist"
                          >
                            <i className="fa-regular fa-heart"></i>
                          </a>
                          <a
                            href={`detail-produk/${product.ProductID}`}
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
                                objectFit: "cover",
                              }}
                            />
                            <img
                              className="back-image"
                              src={getProductPhotoUrl(product.ProductID)}
                              style={{
                                width: "280px",
                                height: "220px",
                                borderRadius: "10px",
                                objectFit: "cover",
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

                            <div
                              className="lokasi"
                              style={{ marginBottom: "-20px" }}
                            >
                              <p>
                                {productLocation
                                  ? productLocation.Kota
                                  : "Tidak Diketahui"}
                                ,
                                <span className="primary-color pl-10 fs-7">
                                  {productLocation
                                    ? productLocation.Provinsi
                                    : "Tidak Diketahui"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default ContentDetailCategory;
