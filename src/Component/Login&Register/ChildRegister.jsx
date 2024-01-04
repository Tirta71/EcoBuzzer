import React from "react";
import RegisterImage from "../../assets/han-so-hee-wallpaper-6.jpg";
import ContentRegister from "./ContentRegister/ContentRegister";
export default function ChildRegister() {
  return (
    <>
      <main>
        <h1 className="text-center pt-50 primary-color">Register</h1>
        <section className="login-area  pt-50 pb-130">
          <div className="container">
            <div className="login__item">
              <div className="row g-4">
                <div className="col-xxl-8">
                  <div className="login__image">
                    <img src={RegisterImage} alt="image" />
                    <div className="btn-wrp">
                      <a href="/login">sign in</a>
                      <a className="active" href="register.html">
                        create account
                      </a>
                    </div>
                  </div>
                </div>
                <ContentRegister />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
