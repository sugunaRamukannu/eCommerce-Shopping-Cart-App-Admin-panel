import axios from "axios";
import { useNavigate } from "react-router-dom";

//Author(s): Ramukannu Suguna
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      // After successful logout, redirect to your Spring Boot app home page
      window.location.href = "/"; // your server-side home
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
