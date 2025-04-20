import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//Author(s): Ramukannu Suguna, Lee Yi Cheng, Melvin
export default function EditProduct() {
  const errorsOutput = {
    productName: "",
    categoryId: "",
    price: "",
  };

  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [labels, setLabels] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]); // Categories state
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Selected category ID
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // form inputs error checking
  const [formErrors, setFormErrors] = useState(errorsOutput);

  useEffect(() => {
    // Fetch categories using axios
    axios

      .get("/api/categories") 

      .then((res) => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
        if (res.data.length > 0) {

          setSelectedCategoryId(res.data[0].categoryId); 

        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
        setLoading(false);
      });

    // Fetch product data
    axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        const product = res.data;
        setProductName(product.productName || "");
        setLabels(product.labels || "");
        setPrice(product.price || "");

        // Set selected category ID from product
        if (product.productCategory && product.productCategory.id) {
          setSelectedCategoryId(product.productCategory.id);
        }
        // console.log("prodcateid" + product.productCategory.id);
      })
      .catch((e) => console.log("Error fetching product", e));
  }, [productId]);

  const handleInputChange = (e) => {
    //error validation
    const input = e.target;
    if (input.value.length === 0) {

      setFormErrors((errors) => ({

        ...errors,
        //targeting the label which is the previous sibling of input
        [input.name]: `Please enter the ${input.previousSibling.innerText.toLowerCase()}`,
      }));
    } else {

      setFormErrors((errors) => ({
        ...errors,

        //clear the respective error if there is an input
        [input.name]: "",
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Track validation errors
  const errors = {};

    if (!productName.trim()) {
      errors.productName = "Please enter the product name";
    }

    if (!price || Number(price) <= 0) {
      errors.price = "Please enter a valid price";
    }

    // Set errors
    setFormErrors(errors);

    // If there are any errors, show an alert and return
    if (Object.keys(errors).length > 0) {
      alert("Please fill up all mandatory form fields before submission.");
      return;
    }

    const updatedData = {
      productName,
      labels,
      price,
      productCategory: {
        id: selectedCategoryId,
      },
    };

    axios
      .put(`/api/products/${productId}`, updatedData)
      .then(() => {
        console.log("Product updated");
        navigate("/admin");
      })
      .catch((e) => console.log("Error updating product", e));
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-5">
      <div className="container mt-5">
        <h1 className="mb-4 fw-bold">Edit Product</h1>
        <div className="border border-black bg-white p-5">

          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control rounded-0"
                name="productName"
                value={productName}
                onChange={(e) => {
                  handleInputChange(e);
                  setProductName(e.target.value);
                }}
                placeholder="Enter Product Name"
                required
              />
              {formErrors.productName && (
                <span className="text-danger d-inline-block mt-2">
                  {formErrors.productName}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select rounded-0"
                name="selectCategoryId"
                value={selectedCategoryId}
                onChange={(e) => {
                  handleInputChange(e);
                  setSelectedCategoryId(e.target.value);
                }}
                placeholder="Enter Category"
                required
              >
                <option value=""></option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
              {formErrors.selectedCategoryId && (
                <span className="text-danger d-inline-block mt-2">
                  {formErrors.selectedCategoryId}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control rounded-0"
                name="price"
                value={price}
                onChange={(e) => {
                  handleInputChange(e);
                  setPrice(e.target.value);
                }}
                placeholder="Enter Price"
                required
              />
              {formErrors.price && (
                <span className="text-danger d-inline-block mt-2">
                  {formErrors.price}
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Label</label>
              <input
                type="text"
                className="form-control rounded-0"
                name="labels"
                value={labels}
                onChange={(e) => {
                  handleInputChange(e);
                  setLabels(e.target.value);
                }}
                placeholder="Enter Labels"
              />
            </div>

            <button type="submit" className="btn btn-primary rounded-0">
              Update Product
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}