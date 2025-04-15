import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//useParams --extract productId from the URL path

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productName = useRef();
  const categoryId = useRef();
  const categoryName = useRef();
  const label = useRef();
  const price = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((res) => {
        const product = res.data;
        productName.current.value = product.productName;
        categoryName.current.value = product.categoryName;
        categoryId.current.value = product.categoryId;
        label.current.value = product.labels;
        price.current.value = product.price;
      })
      .catch((e) => console.log(e));
  }, [productId]); //dependency is added here

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      productName: productName.current.value,
      categoryName: categoryName.current.value,
      categoryId: categoryId.current.value,
      label: label.current.value,
      price: price.current.value,
    };

    axios
      .put(`http://localhost:8080/api/products/${productId}`, updatedData)
      .then(() => {
        console.log("Product updated");
        navigate("/products");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 fw-bold">Edit Product</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" ref={productName} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input type="text" className="form-control" ref={categoryName} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category ID</label>
          <input type="number" className="form-control" ref={categoryId} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" ref={price} />
        </div>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input type="text" className="form-control" ref={label} />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
