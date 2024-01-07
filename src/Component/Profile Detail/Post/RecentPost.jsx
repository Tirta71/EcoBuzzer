import React, { useState, useEffect } from "react";
import axios from "axios";

const PRODUK_API = "http://localhost:8000/api/produk";
const PHOTO_API = "http://localhost:8000/api/photo";

export default function RecentPost() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produkResponse = await axios.get(PRODUK_API);
        const produkData = produkResponse.data.data;
        setProducts(produkData);

        const photoResponse = await axios.get(PHOTO_API);
        const photoData = photoResponse.data.data;
        setPhotos(photoData);

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

  return (
    <>
      <h4 className="mb-30">Recent Posts</h4>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        products.slice(0, 2).map((product) => (
          <div
            className="recent-post p-0 bor-bottom pb-4 mb-4 sub-bg"
            key={product.ProductID}
          >
            <div className="img">
              <img
                src={getProductPhotoUrl(product.ProductID)}
                alt={product.NamaProduk}
                style={{ width: "78px", height: "80px", borderRadius: "10px" }}
              />
            </div>
            <div className="con">
              <span>
                {new Date(product.TanggalDiposting).toLocaleDateString("id-ID")}
              </span>
              <h5>
                <a href={`#0/${product.ProductID}`}>{product.NamaProduk}</a>
              </h5>
            </div>
          </div>
        ))
      ) : (
        <p>Tidak Ada Produk</p>
      )}
    </>
  );
}
