import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//useParams --extract productId from the URL path

export default function EditProduct() {
  const defaultFormData = {
    productName: "",
    categoryName: "",
    categoryId: "",
    price: "",
    label: "",
  };

  const errorsOutput = {
    productName: "",
    categoryName: "",
    categoryId: "",
    price: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(errorsOutput);
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    //error validation
    const input = e.target;
    if (input.value.length === 0) {
      setErrors(errors => ({
        ...errors,
        //targeting the label which is the previous sibling of input
        [input.name]: `Please enter ${input.previousSibling.innerText.toLowerCase()}`,
      }));
    } else {
      setErrors(errors => ({...errors,
        //clear the respective error if there is an input
        [input.name]: "",
      }));
    }

    //update input accordingly
    setFormData((prevFormData) => ({
      ...prevFormData,
      [input.name]: input.value,
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((res) => {
        const { productName, categoryName, categoryId, label, price } = res.data;
        setFormData({
          productName: productName || "", //prevents controlled input values from undefined
          categoryName: categoryName || "",
          categoryId: categoryId || "",
          label: label || "",
          price: price || "",
        });
      })
      .catch((e) => console.log(e));
  }, [productId]); //dependency is added here

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorCount = 0;
    for (const key in errors) {
      if (errors[key]) errorCount++;
    }
    if (errorCount > 0) return alert("Please fill up all mandatory form fields before submission.");

    axios
      .put(`http://localhost:8080/api/products/${productId}`, formData)
      .then(() => {
        console.log("Product updated");
        navigate("/products");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 fw-bold">Edit Product</h1>
      <div className="border border-black p-5">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 b">
          <label className="form-label">Product Name</label>
          <input type="text"
            className="form-control rounded-0"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
          {errors.productName && <span className="text-danger d-inline-block mt-2">{errors.productName}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input type="text"
            className="form-control rounded-0"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
          />
          {errors.categoryName && <span className="text-danger d-inline-block mt-2">{errors.categoryName}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Category ID</label>
          <input type="number"
            className="form-control rounded-0"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          />
          {errors.categoryId && <span className="text-danger d-inline-block mt-2">{errors.categoryId}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number"
            className="form-control rounded-0"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <span className="text-danger d-inline-block mt-2">{errors.price}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input type="text"
            className="form-control rounded-0"
            name="label"
            value={formData.label}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3 rounded-0"
        >
          Update Product
        </button>
      </form>
    </div>
      </div>
  );
}
