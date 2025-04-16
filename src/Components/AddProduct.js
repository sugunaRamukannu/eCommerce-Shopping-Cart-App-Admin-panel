import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const productName = useRef();
  const labels = useRef();
  const price = useRef();
  const productCategory = useRef();

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data);
        console.log("API Response:", response.data);
        if (response.data.length > 0) {
          setSelectedCategoryId(response.data[0].categoryId); // default to first category
        }
      })
      .catch((e) => {
        console.error("Failed to fetch categories:", e);
      });
  }, []);

  function handleCreateClick(e) {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.categoryId.toString() === selectedCategoryId.toString()
    );

    console.log("bsj" + selectedCategory.categoryId);
    const data = {
      productName: productName.current.value,
      labels: labels.current.value,
      price: price.current.value,
      categoryId: selectedCategory.categoryId,
      categoryName: selectedCategory.categoryName,
    };

    console.log(productCategory.categoryId);

    axios
      .post("http://localhost:8080/api/products", data)
      .then((response) => {
        console.log("Sending data:", JSON.stringify(data, null, 2));
        console.log("Product created:", response.data);
        navigate("/admin");
      })
      .catch((e) => {
        console.log("Error creating product:", e);
      });
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h2 className="mb-4 text-center">Add New Product</h2>
        <form>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Product Name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={productName} />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Category</label>
            <div className="col-sm-8">
              <select
                className="form-control"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Price</label>
            <div className="col-sm-8">
              <input type="number" className="form-control" ref={price} />
            </div>
          </div>

          <div className="mb-4 row">
            <label className="col-sm-4 col-form-label">Label</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={labels} />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-50"
              onClick={handleCreateClick}
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
