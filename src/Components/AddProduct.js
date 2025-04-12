import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const productName = useRef();
  const categoryId = useRef();
  const categoryName = useRef();
  const labels = useRef();
  const price = useRef();

  function handleCreateClick(e) {
    e.preventDefault();
    console.log(productName.current.value);
    console.log(categoryName.current.value);
    console.log(categoryId.current.value);
    console.log(labels.current.value);
    console.log(price.current.value);
    console.log("Create button is clicked");

    const data = {
      productName: productName.current.value,
      categoryName: categoryName.current.value,
      categoryId: categoryId.current.value,
      labels: labels.current.value,
      price: price.current.value,
    };
    console.log("before");
    console.log(data);
    console.log("after");
    axios
      .post("http://localhost:8080/api/products", data)
      .then((response) => {
        console.log("success");
        console.log(response.data);
        navigate("/products");
      })
      .catch((e) => {
        console.log(e);
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
            <label className="col-sm-4 col-form-label">Category Name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={categoryName} />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Category ID</label>
            <div className="col-sm-8">
              <input type="number" className="form-control" ref={categoryId} />
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
