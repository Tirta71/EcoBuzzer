import React from "react";
import MyNavbar from "../../../Component/Layout/MyNavbar";
import HeaderHome from "../../../Component/Home/HeaderHome";
import ChildEditProduk from "../../../Component/Profile Detail/Post/Produk/ChildEditProduk";

export default function EditDetailProduk() {
  return (
    <>
      <HeaderHome />
      <MyNavbar />
      <main>
        <ChildEditProduk />
      </main>
    </>
  );
}
