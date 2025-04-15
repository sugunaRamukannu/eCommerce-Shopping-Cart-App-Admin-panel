import "./App.css";
import AdminNavbar from "./Components/Appbar";
import Products from "./Components/Product";
import AddProduct from "./Components/AddProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProduct from "./Components/EditProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/login" element={<Products />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
