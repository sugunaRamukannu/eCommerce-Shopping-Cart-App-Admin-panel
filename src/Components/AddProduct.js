import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Author(s): Ramukannu Suguna, Lee Yi Cheng, Melvin
export default function AddProduct() {
  const errorsOutput = {
    productName: "",
    selectedCategoryId: "",
    price: "",
    labels: "",
  };

  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [labels, setLabels] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // form inputs error checking
  const [formErrors, setFormErrors] = useState(errorsOutput);

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get("/api/categories")
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

      setFormErrors(errors => ({...errors,

        //clear the respective error if there is an input
        [input.name]: "",
      }));
    }
  };

  function handleCreateClick(e) {
    e.preventDefault();

     // Track validation errors
    const errors = {};

    if (!productName.trim()) {
      errors.productName = "Please enter the product name";
    }

    if (!selectedCategoryId) {
      errors.selectedCategoryId = "Please select a category";
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

    const selectedCategory = categories.find(
      (cat) => cat.categoryId.toString() === selectedCategoryId.toString()
    );

    const data = {
      productName,
      labels,
      price,
      categoryId: selectedCategory.categoryId,
      categoryName: selectedCategory.categoryName,
    };

    axios
      .post("/api/products", data)
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
    <section className="py-5">
      <div className="container mt-5">
        <h1 className="mb-4 fw-bold">Add New Product</h1>
        <div className="border border-black bg-white p-5">

          <form>
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                className="form-control rounded-0"
                name="productName"
                onChange={(e) =>{

                  handleInputChange(e);
                  setProductName(e.target.value);
                }}
                placeholder="Enter Product Name"
                required
              />

               {formErrors.productName && <span className="text-danger d-inline-block mt-2">{formErrors.productName}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>

              <select
                className="form-control rounded-0"
                name="selectedCategoryId"
                value={selectedCategoryId}
                onChange={(e) =>{

                  handleInputChange(e);
                  setSelectedCategoryId(e.target.value);
                }}
                placeholder="Enter Category"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              {formErrors.selectedCategoryId && <span className="text-danger d-inline-block mt-2">{formErrors.selectedCategoryId}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control rounded-0"
                name="price"
                onChange={(e) =>{

                  handleInputChange(e);
                  setPrice(e.target.value);
                }}
                placeholder="Enter Price"
                required
              />

              {formErrors.price && <span className="text-danger d-inline-block mt-2">{formErrors.price}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Label</label>

              <input
                type="text"
                className="form-control rounded-0"
                name="labels"

                onChange={(e) =>{

                  handleInputChange(e);
                  setLabels(e.target.value);
                }}
                placeholder="Enter Labels"
              />
          </div>
            <button
              type="submit"
              className="btn btn-primary rounded-0"
              onClick={handleCreateClick}
            >
              Create Product
            </button>
        </form>
        </div>
      </div>
    </section>
  );
}
