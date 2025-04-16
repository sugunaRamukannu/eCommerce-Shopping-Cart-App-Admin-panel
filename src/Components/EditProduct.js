import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // const productName = useRef();
  // const labels = useRef();
  // const price = useRef();
  const [productName, setProductName] = useState("");
  const [labels, setLabels] = useState("");
  const [price, setPrice] = useState("");
  // const [categoryName, setCategoryName] = useState("");

  const [categories, setCategories] = useState([]); // Categories state
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Selected category ID
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch categories using axios
    axios
      .get("http://localhost:8080/api/categories") // Ensure this URL is correct
      .then((res) => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategoryId(res.data[0].categoryId); // ✅ correct
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
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((res) => {
        const product = res.data;
        setProductName(product.productName);
        setLabels(product.labels);
        setPrice(product.price);

        // Set selected category ID from product
        if (product.productCategory && product.productCategory.id) {
          setSelectedCategoryId(product.productCategory.id);
        }
        // console.log("prodcateid" + product.productCategory.id);
      })
      .catch((e) => console.log("Error fetching product", e));
  }, [productId]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      productName,
      labels,
      price,
      productCategory: {
        id: selectedCategoryId,
      },
    };

    axios
      .put(`http://localhost:8080/api/products/${productId}`, updatedData)
      .then(() => {
        console.log("Product updated");
        navigate("/admin");
      })
      .catch((e) => console.log("Error updating product", e));
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value=""></option>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.cateoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            type="text"
            className="form-control"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
}
