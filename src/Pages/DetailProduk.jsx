import React from "react";
import ChildDetailProduk from "../Component/DetailProduk/ChildDetailProduk";
import HeaderHome from "../Component/Home/HeaderHome";
import MyNavbar from "../Component/Layout/MyNavbar";
import Footer from "../Component/Layout/Footer";
import { useParams } from "react-router-dom";
export default function DetailProduk() {
  const { ProductID } = useParams();

  console.log(ProductID);
  return (
    <>
      <HeaderHome />
      <MyNavbar />

      <main>
        <ChildDetailProduk ProductID={ProductID} />
      </main>
      <Footer />
    </>
  );
}
