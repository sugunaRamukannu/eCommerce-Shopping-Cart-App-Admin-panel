import "./App.css";
import AdminNavbar from "./Components/Appbar";
import Products from "./Components/Product";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import AccessDenied from "./Components/AccessDenied";


function App() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/role", { withCredentials: true })
      .then((res) => {
        const plainRole = res.data.replace("ROLE_", "");

        setRole(plainRole);
      })
      .catch(() => {
        setRole("");

      })
      .finally(() => setLoading(false));
  }, []);


  const handleLogout = () => {
    axios

      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      )

      .then(() => {
        setRole("");
      })

      .catch((err) => console.error("Logout failed:", err));
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>

        <AdminNavbar role={role} onLogout={handleLogout} />
        <Routes>
          <Route path="/" exact element={<Home role={role} />} />
          <Route path="/admin" element={<Products role={role} />} />
          <Route path="/access-denied" element={<AccessDenied />} />

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