import React, { useState, useEffect } from "react";

const SearchProduk = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch products from the API based on the search query
    const apiUrl = "http://localhost:8000/api/produk/";

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("API Response:", data); // Log API response

        if (data && data.data) {
          const filteredResults = data.data.filter((product) =>
            product.NamaProduk.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchProducts();
    } else {
      setSearchResults([]); // Clear results when search query is empty
    }
  }, [searchQuery]);

  return (
    <>
      <div>
        <div className="search__wrp">
          <input
            placeholder="Search for"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.trim() !== "" && searchResults.length > 0 && (
            <div className="search-results">
              <h4>Matching Products:</h4>
              <ul>
                {searchResults.map((product) => (
                  <li key={product.ProductID}>{product.NamaProduk}</li>
                ))}
              </ul>
            </div>
          )}
          <style jsx>{`
            .search__wrp {
              margin-bottom: 20px;
            }

            .search-results {
              border: 1px solid #ccc;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .search-results h4 {
              margin-bottom: 10px;
            }

            .search-results ul {
              list-style-type: none;
              padding: 0;
            }

            .search-results li {
              margin: 5px 0;
              padding: 8px;
              background-color: #f8f8f8;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }

            .search-results li:hover {
              background-color: #e3e3e3;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default SearchProduk;
