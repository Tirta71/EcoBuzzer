import React from "react";
import HeaderHome from "../Component/Home/HeaderHome";
import MyNavbar from "../Component/Layout/MyNavbar";
import Loading from "../Component/Layout/Loading";
import Hero from "../Component/Home/Hero";
import Category from "../Component/Home/Category";
import ListProduk from "../Component/Home/ListProduk";
import Footer from "../Component/Layout/Footer";
import ScrollUp from "../Component/Layout/ScrollUp";

export default function Home() {
  return (
    <>
      <HeaderHome />
      <MyNavbar />

      <Loading />

      <main>
        <Hero />
        <Category />
        <ListProduk />
      </main>

      <Footer />
    </>
  );
}
