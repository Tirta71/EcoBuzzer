import React, { useState, useEffect } from "react";

const CategoryProduk = ({ product }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/kategoris/")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const getCategoryLinks = () => {
    if (!product || !categories) {
      return null;
    }

    const productCategory = categories.find(
      (category) => category.KategoriID === product.KategoriID
    );

    return (
      <a href="#0" className="primary-hover">
        {productCategory ? productCategory.NamaKategori : "Uncategorized"}
      </a>
    );
  };

  return (
    <div className="col-lg-8">
      <div className="details-area">
        <div className="category flex-wrap mt-4 d-flex py-3 bor-top bor-bottom">
          <h4 className="pe-3">Categories :</h4>
          {getCategoryLinks()}
          <span className="px-2"></span>
        </div>

        <a href="#0" className="d-block text-center btn-two mt-40">
          <span>
            <i className="fa-solid fa-basket-shopping pe-2"></i> Chat Now
          </span>
        </a>
      </div>
    </div>
  );
};

export default CategoryProduk;
