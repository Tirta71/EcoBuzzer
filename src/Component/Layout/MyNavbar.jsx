import React, { useState, useEffect } from "react";
import imageFlag from "../../assets/images/flag/picking.png";

export default function MyNavbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isHeaderBarActive, setIsHeaderBarActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const categoryAreaElement = document.querySelector("#startFixed");

      if (categoryAreaElement) {
        const categoryAreaRect = categoryAreaElement.getBoundingClientRect();
        const isFixed = categoryAreaRect.top <= 0;
        setIsFixed(isFixed);
      }

      // Check if the screen is in mobile view
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: isFixed ? "rgba(25, 25, 25, 0.9)" : "transparent",
    boxShadow: isFixed ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
    opacity: isFixed ? 1 : 0.9,
  };

  const headerClass = isFixed ? "header-section" : "";

  const toggleHeaderBar = () => {
    setIsHeaderBarActive((prev) => !prev);
  };

  return (
    <header
      style={isFixed ? navbarStyle : null}
      className={`header-section ${headerClass}`}
    >
      <div className="container">
        <div className="header-wrapper">
          <div
            className={`header-bar d-lg-none  ${
              isHeaderBarActive ? "active" : ""
            }`}
            onClick={toggleHeaderBar}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul
            className={`main-menu ${isHeaderBarActive ? "active" : ""}`}
            onClick={toggleHeaderBar}
          >
            <li>
              <a href="/">
                Home <i className="fa-regular "></i>
              </a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
          <div className="shipping__item d-none d-sm-flex align-items-center">
            <div className="menu__right d-flex align-items-center">
              <div className="thumb">
                <img src={imageFlag} alt="image" />
              </div>
              <div className="content">
                <p>Picking up?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
