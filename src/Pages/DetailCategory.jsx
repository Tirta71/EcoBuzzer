import React from "react";
import { useParams } from "react-router-dom";
import HeaderHome from "../Component/Home/HeaderHome";
import MyNavbar from "../Component/Layout/MyNavbar";
import ChildDetailCategory from "../Component/DetailCategory/ChildDetailCategory";
import Footer from "../Component/Layout/Footer";
import Loading from "../Component/Layout/Loading";

export default function DetailCategory() {
  const KategoriID = useParams();

  console.log(KategoriID);
  return (
    <>
      <HeaderHome />
      <MyNavbar />
      <Loading />
      <main>
        <ChildDetailCategory />
      </main>
      <Footer />
    </>
  );
}
