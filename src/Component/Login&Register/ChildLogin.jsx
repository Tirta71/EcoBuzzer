import React, { useState } from "react";
import LoginImage from "../../assets/han-so-hee-wallpaper-6.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
export default function ChildLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:8000/api/login";

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;

        if (data.status === "OK" && data.data.length > 0) {
          const user = data.data.find((userData) => userData.Email === email);

          if (user) {
            localStorage.setItem("UserID", user.UserID);
            localStorage.setItem("userName", user.Nama);
            Swal.fire({
              icon: "success",
              title: "Login Success",
              showConfirmButton: false,
              timer: 2000,
            });

            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid email or password",
            });
            setEmail("");
            setPassword("");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid email or password",
          });
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Login failed", error.response?.data || error.message);
        Swal.fire({
          icon: "error",
          title: "An error occurred during login",
        });
      });
  };

  return (
    <>
      <main>
        <ToastContainer />
        <h1 className="text-center pt-50 primary-color">Login</h1>

        <section className="login-area pt-50 pb-130">
          <div className="container">
            <div className="login__item">
              <div className="row g-4">
                <div className="col-xxl-8">
                  <div className="login__image">
                    <img src={LoginImage} alt="image" />
                    <div className="btn-wrp">
                      <a className="active" href="/login">
                        sign in
                      </a>
                      <a href="/register">create account</a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4">
                  <div className="login__content">
                    <h2 className="text-white mb-65">Welcome Back</h2>
                    <div className="form-area login__form">
                      <form onSubmit={handleLogin}>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          className="mt-30"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="mt-30">
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
