import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((products) => products.productId !== productId)
        );
      }
      console.log("products" + productId);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-product")}
      >
        + Add Product
      </button>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>productId</th>
              <th>productName</th>
              <th>price</th>
              <th>categoryId</th>
              <th>categoryName</th>
              <th>labels</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>${product.price}</td>
                  <td>{product.categoryId}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.labels}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(product.productId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.productId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
