import React from "react";
import ChildLogin from "../../Component/Login&Register/ChildLogin";
import Swal from "sweetalert2";

export default function Login() {
  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not logged in!",
    });
  };
  return (
    <>
      <ChildLogin />
      {showAlert()}
    </>
  );
}
