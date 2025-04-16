import { Link } from "react-router-dom";
import productDashboard from "../img/admin-product.png";

export default function Products() {

    return (
        <>
        <section className="py-5">
         <div className="container p-5 px-md-0 text-center">
            <h1 className="display-4 fw-bold mt-5">GetFreshFood Admin Portal</h1>
            <p className="fs-3 fw-semibold">Access your products dashboard here!</p>
            <Link className="d-inline-block p-3 btn btn-secondary fw-semibold link-underline link-underline-opacity-0 m-4 rounded-0" to="/admin">Go To Products</Link>
            <div className="border border-black product-dashboard">
                <img className="p-3 p-lg-5" src={productDashboard} alt="product-dashboard"/>
            </div>
          </div>
        </section>
        </> 
    )
}