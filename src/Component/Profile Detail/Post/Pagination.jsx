import React from "react";

export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  return (
    <div className="pt-4 bor-top mt-75">
      {Array.from(
        { length: Math.ceil(totalProducts / productsPerPage) },
        (_, i) => (
          <a
            key={i}
            className={`blog-pegi ${i + 1 === currentPage ? "active" : ""}`}
            onClick={() => paginate(i + 1)}
            href="#0"
          >
            {i + 1}
          </a>
        )
      )}
      <a href="#0">
        <i className="fa-solid fa-arrow-right-long"></i>
      </a>
    </div>
  );
}
