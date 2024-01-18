import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you are using React Router

const ChatNow = () => {
  const { ProductID } = useParams();
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrlProduk = "http://localhost:8000/api/produk";
  const apiUrlUser = "http://localhost:8000/api/user";

  useEffect(() => {
    setLoading(true);

    fetch(apiUrlProduk)
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message === "Data Produk Ditemukan" &&
          data.data &&
          data.data.length > 0
        ) {
          const product = data.data.find(
            (product) => product.ProductID.toString() === ProductID
          );

          if (product) {
            const userId = product.UserID;

            fetch(`${apiUrlUser}/${userId}`)
              .then((userResponse) => userResponse.json())
              .then((userData) => {
                setUserPhoneNumber(userData.data.NomorTelepon);
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);

                alert("Error fetching user data. Please try again later.");
              })
              .finally(() => setLoading(false));
          } else {
            setLoading(false);
            console.error("No product found with the specified ID");
          }
        } else {
          setLoading(false);
          console.error("Invalid product data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);

        alert("Error fetching product data. Please try again later.");
        setLoading(false);
      });
  }, [ProductID]); // Add productID to the dependency array

  const handleChatNowClick = () => {
    if (userPhoneNumber) {
      const whatsappLink = `https://wa.me/${userPhoneNumber}`;
      window.open(whatsappLink, "_blank");
    } else {
      console.error("User phone number not found");

      alert("User phone number not found. Unable to initiate chat.");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <a
          href="#0"
          className="d-block text-center btn-two mt-40"
          onClick={handleChatNowClick}
        >
          <span>
            <i className="fa-solid fa-basket-shopping pe-2"></i> Chat Now
          </span>
        </a>
      )}
    </>
  );
};

export default ChatNow;
