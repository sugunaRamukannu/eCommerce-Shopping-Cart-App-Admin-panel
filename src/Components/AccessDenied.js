import React from "react";
import { Link } from "react-router-dom";

//Author(s): Ramukannu Suguna
export default function AccessDenied() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-4 text-danger">Access Denied</h1>
        <p className="lead">You do not have permission to view this page.</p>
        <Link to="http://localhost:8080/" className="btn btn-primary mt-3 rounded-0">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
