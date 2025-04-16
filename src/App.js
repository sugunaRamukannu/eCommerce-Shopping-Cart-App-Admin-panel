import "./App.css";
import AdminNavbar from "./Components/Appbar";
import Products from "./Components/Product";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/role", { withCredentials: true })
      .then((res) => {
        const plainRole = res.data.replace("ROLE_", "");
        setRole(plainRole); // e.g., "ADMIN" or "USER"
      })
      .catch(() => {
        setRole(""); // If not logged in or error
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>
        <AdminNavbar role={role} />
        <Routes>
          <Route path="/admin" element={<Products />} />
          {/* <Route path="/products" element={<Products />} /> */}

          {/* Admin-only routes */}
          <Route
            path="/add-product"
            element={
              role === "ADMIN" ? <AddProduct /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              role === "ADMIN" ? <EditProduct /> : <Navigate to="/admin" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;