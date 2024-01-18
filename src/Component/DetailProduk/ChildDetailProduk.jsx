/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Gambar1 from "../../assets/images/shop/01.jpg";
import DeskripsiProduk from "./DeskripsiProduk";
import CategoryProduk from "./CategoryProduk";
import { useParams } from "react-router-dom";
import { PRODUK_API } from "../../Api/ApiProduk";
import { PHOTO_API } from "../../Api/ApiPhoto";

export default function ChildDetailProduk() {
  const { ProductID } = useParams();
  const [product, setProduct] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details based on ProductID
        const productResponse = await fetch(`${PRODUK_API}/${ProductID}`);
        const productData = await productResponse.json();
        setProduct(productData.data);

        // Fetch photos based on ProductID
        const photosResponse = await fetch(PHOTO_API);
        const photosData = await photosResponse.json();
        setPhotos(photosData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ProductID]);

  const getProductPhotoUrl = () => {
    if (!Array.isArray(photos)) {
      return "";
    }

    const photo = photos.find(
      (photo) => photo.ProductID === parseInt(ProductID, 10)
    );
    return photo ? `http://localhost:8000${photo.URLFoto}` : "";
  };

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <main>
        <section className="shop-single mt-130 pt-130 pb-130">
          <div className="container">
            <div className="product-details-single pb-40">
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="image img">
                    <div className="swiper shop-single-slide">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img
                            src={getProductPhotoUrl(product.ProductID)}
                            alt="image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <DeskripsiProduk product={product} />
                  <div className="row">
                    <CategoryProduk product={product} ProductID={ProductID} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
