import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccessDenied from "./AccessDenied";

//Author(s): Ramukannu Suguna
export default function Products({role}) {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0); // current page index
  const [totalPages, setTotalPages] = useState(0); // total pages
  const pageSize = 7;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/products?page=${page}&size=${pageSize}`)
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [page]);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `/api/products/${productId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      }
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };


  if (role !== "ADMIN") {
    return <AccessDenied />;
  }

  return (
    <section className="py-5">
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-success rounded-0"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
          <h1 className="fw-bold flex-grow-1 text-center m-0">Product List</h1>
          <div style={{ width: "95px" }}></div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>productId</th>
                <th>productName</th>
                <th>price</th>
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
                    <td>${product.price?.toFixed(2)}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.labels}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2 rounded-0"
                        onClick={() => handleEdit(product.productId)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger rounded-0"
                        onClick={() => handleDelete(product.productId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* //pagination */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-dark me-2 rounded-0"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="btn btn-outline-dark ms-2 rounded-0"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}