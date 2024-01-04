import React from "react";
import HeaderDetailCategory from "./HeaderDetailCategory";
import ContentDetailCategory from "./ContentDetailCategory";

export default function ChildDetailCategory() {
  return (
    <>
      <section className="product-area pt-130 pb-130 mt-130">
        <div className="container">
          <HeaderDetailCategory />
          <ContentDetailCategory />
        </div>
      </section>
    </>
  );
}
