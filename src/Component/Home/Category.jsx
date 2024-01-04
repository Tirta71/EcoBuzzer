import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import staticIcons from "../../Data/StaticIcon";
import staticImages from "../../Data/StaticImage";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/kategoris")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);

        // Initialize Swiper with dynamic slidesPerView
        const swiper = new Swiper(".category__slider", {
          spaceBetween: 30,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            640: {
              slidesPerView: 1, // 1 slide for mobile devices
            },
            768: {
              slidesPerView: 2, // 2 slides for tablets
            },
            1024: {
              slidesPerView: 4, // 4 slides for larger screens
            },
          },
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  if (!categories) {
    return null;
  }

  return (
    <section className="category-area category-two pb-130">
      <div className="container">
        <div
          className="sub-title text-center mb-65 wow fadeInUp"
          data-wow-delay=".1s"
        >
          <h3>
            <span className="title-icon"></span> our top categories{" "}
            <span className="title-icon"></span>
          </h3>
        </div>
        <div className="swiper category__slider">
          <div className="swiper-wrapper">
            {categories.map((category, index) => (
              <div key={category.KategoriID} className="swiper-slide">
                <div className="category__item category-two__item text-center">
                  <Link
                    to={`/detail-category/${category.KategoriID}`}
                    className="category__image d-block"
                  >
                    <img
                      src={staticImages[index % staticImages.length]}
                      alt="image"
                    />
                    <div className="category-icon">
                      <img
                        src={staticIcons[index % staticIcons.length]}
                        alt="icon"
                      />
                    </div>
                  </Link>
                  <h4 className="mt-30">
                    <Link to={`/detail-category/${category.KategoriID}`}>
                      {category.NamaKategori}
                    </Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
