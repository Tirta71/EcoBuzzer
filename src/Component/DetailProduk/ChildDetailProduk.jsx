import React, { useEffect, useState } from "react";
import Gambar1 from "../../assets/images/shop/01.jpg";
import DeskripsiProduk from "./DeskripsiProduk";
import CategoryProduk from "./CategoryProduk";
import { useParams } from "react-router-dom";
export default function ChildDetailProduk() {
  const { ProductID } = useParams();
  const [product, setProduct] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch product details based on ProductID
    fetch(`http://localhost:8000/api/produk/${ProductID}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    // Fetch photos based on ProductID
    fetch(`http://localhost:8000/api/photo/`)
      .then((response) => response.json())
      .then((data) => setPhotos(data.data))
      .catch((error) => console.error("Error fetching photos:", error));
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
