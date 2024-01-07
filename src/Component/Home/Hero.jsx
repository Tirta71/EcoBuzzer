import axios from "axios";
import React, { useEffect, useState } from "react";
import { PRODUK_API } from "../../Api/ApiProduk";
export default function Hero() {
  const [harga, setHarga] = useState([]);

  useEffect(() => {
    axios
      .get(PRODUK_API)
      .then((response) => {
        const prices = response.data.data.map((product) => product.Harga);
        setHarga(prices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <section className="banner-two">
      <div className="swiper banner-two__slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div
              className="slide-bg"
              data-background="assets/images/banner/banner-two-image1.jpg"
            ></div>
            <div className="container">
              <div className="banner-two__content">
                <h4 data-animation="fadeInUp" id="startFixed" data-delay="1s">
                  <img src="assets/images/icon/fire.svg" alt="icon" /> GET{" "}
                  <span className="primary-color">your dream item</span> NOW
                </h4>
                <h1 data-animation="fadeInUp" data-delay="1.3s">
                  Find everything <br />
                  for <span className="primary-color">life</span>
                </h1>
                <p
                  className="mt-40"
                  data-animation="fadeInUp"
                  data-delay="1.5s"
                >
                  Buy and sell second-hand items effortlessly with localized
                  currencies, languages, and a seamless experience in every
                  market. Explore a wide range of pre-owned products, from
                  vintage treasures to gently used items, catering to diverse
                  tastes and preferences."
                </p>
                <div
                  className="banner-two__info mt-30"
                  data-animation="fadeInUp"
                  data-delay="1.7s"
                >
                  <span className="mb-10">Starting Price</span>
                  <h3>
                    {harga.length > 0
                      ? `${formatCurrency(Math.min(...harga))}`
                      : "Loading..."}
                  </h3>
                </div>
                <div className="btn-wrp mt-65">
                  <a
                    href="shop.html"
                    className="btn-one"
                    data-animation="fadeInUp"
                    data-delay="1.8s"
                  >
                    <span>Shop Now</span>
                  </a>
                  <a
                    className="btn-one-light ml-20"
                    href="shop-single.html"
                    data-animation="fadeInUp"
                    data-delay="1.9s"
                  >
                    <span>View Details</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
