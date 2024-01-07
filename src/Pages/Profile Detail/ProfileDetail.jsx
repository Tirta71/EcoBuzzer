import React from "react";
import ChildProfileDetail from "../../Component/Profile Detail/ChildProfileDetail";
import HeaderHome from "../../Component/Home/HeaderHome";
import MyNavbar from "../../Component/Layout/MyNavbar";

export default function ProfileDetail() {
  return (
    <>
      <HeaderHome />
      <MyNavbar />
      <ChildProfileDetail />
    </>
  );
}
