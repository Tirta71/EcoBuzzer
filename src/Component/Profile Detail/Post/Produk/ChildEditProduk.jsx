import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../../Layout/Loading";
import Swal from "sweetalert2";

export default function ChildEditProduk() {
  const { ProductID } = useParams();
  const userId = localStorage.getItem("UserID");
  const [product, setProduct] = useState({
    NamaProduk: "",
    Deskripsi: "",
    KategoriID: "",
    Harga: "",
    Status: "",
    UserID: userId,
    LokasiID: "",
    TanggalDiposting: "",
    Kondisi: "",
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8000/api/produk/${ProductID}`
        );
        setProduct({
          ...productResponse.data.data,
          ProductID: ProductID,
          TanggalDiposting: productResponse.data.data.TanggalDiposting,
        });

        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/kategoris/"
        );
        setCategories(categoriesResponse.data.data);

        const locationsResponse = await axios.get(
          "http://localhost:8000/api/lokasi/"
        );
        setLocations(locationsResponse.data.data);

        const categoryNameResponse = await axios.get(
          `http://localhost:8000/api/kategoris/${productResponse.data.data.KategoriID}`
        );
        setProduct((prevProduct) => ({
          ...prevProduct,
          CategoryName: categoryNameResponse.data.data.NamaKategori,
        }));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ProductID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/products/${ProductID}`,
        product
      );

      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "Your changes have been saved.",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/profile-detail";
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product. Please try again.",
      });

      console.error("Error editing product:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mt-200">
      <form onSubmit={handleEditSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="NamaProduk"
            value={product.NamaProduk}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="Deskripsi"
            value={product.Deskripsi}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            name="KategoriID"
            value={product.KategoriID}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.KategoriID} value={category.KategoriID}>
                {category.NamaKategori}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="Harga"
            value={product.Harga}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            name="Status"
            value={product.Status}
            onChange={handleInputChange}
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Condition:</label>
          <select
            className="form-select"
            name="Kondisi"
            value={product.Kondisi}
            onChange={handleInputChange}
          >
            <option value="Baik">Baik</option>
            <option value="Rusak">Rusak</option>
            <option value="Sebagian Rusak">Sebagian Rusak</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Di post</label>
          <input
            type="text"
            className="form-control"
            name="Harga"
            value={product.TanggalDiposting}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-dark mb-5 mt-5 primary-color w-100"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
