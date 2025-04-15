import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";

export default function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  function handleClick(e) {
    const selectedLink = e.target.closest('a');
    setActiveLink(selectedLink.dataset.page);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
				<div className="container px-5 px-lg-0">
					<NavLink to="/"
						className="navbar-brand d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
						<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
							className="bi bi-basket3-fill me-2" viewBox="0 0 16 16">
							<path
								d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
						</svg>
						<span className="fs-3 fw-bold">GetFreshFood</span>
					</NavLink>
					<button className="navbar-toggler bg-primary rounded-0" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
						{/* <form action="#" method="GET" className="d-flex w-100" role="search">
							<select name="searchtype" className="form-select me-2 rounded-0">
								<option value="name">Product Name</option>
								<option value="category">Product Category</option>
							</select>
							<input className="form-control me-2 rounded-0" type="search" placeholder="Search Products"
								name="keyword" required />
							<button className="btn btn-primary rounded-0" type="submit">Search</button>
						</form> */}
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5 align-items-lg-center">
							<li className="nav-item">
								<NavLink to="/" data-page="home" onClick={handleClick} className={`nav-link text-white ${activeLink === "home" ? 'active-link' : ''}`} aria-current="page">
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
										className="bi bi-house d-lg-block mx-auto" viewBox="0 0 16 16">
										<path
											d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
									</svg>
									<span>Home</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/products" data-page="products" onClick={handleClick} className={`nav-link text-white ${activeLink === "products" ? 'active-link' : ''}`}>
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
										className="bi bi-box-seam d-lg-block mx-auto" viewBox="0 0 16 16">
										<path
											d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
									</svg>
									<span>Products</span>
								</NavLink>
							</li>
              {!isLoggedIn ? 
              <li className="nav-item">
								<Link data-page="login" to="/login" onClick={handleClick} className={`nav-link text-white ${activeLink === "login" ? 'active-link' : ''}`}>
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
										className="bi bi-person-circle d-lg-block mx-auto" viewBox="0 0 16 16">
										<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
										<path fill-rule="evenodd"
											d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
									</svg>
									<span>Login</span>
								</Link>
							</li>
              :
              <li className="nav-item dropdown" data-bs-toggle="collapse"
								to="#collapseExample">
								<Link className="nav-link text-primary" to="#" role="button" data-bs-toggle="dropdown"
									aria-expanded="false">
									{/* Profile Picture Added Based on Last Digit in Phone Number */}
									<img className="profile rounded-circle d-lg-block mx-auto" width="80" height="80"
										src="#"
										alt="Profile" />
								</Link>
								<ul className="dropdown-menu rounded-0" data-bs-toggle="collapse"
									data-bs-target="#collapseExample">
									<li>
										<Link className="dropdown-item" to="#">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
												fill="currentColor" className="bi bi-receipt" viewBox="0 0 16 16">
												<path
													d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
												<path
													d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
											</svg>
											<span>Purchases</span>
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="#">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
												fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
												<path fill-rule="evenodd"
													d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
												<path fill-rule="evenodd"
													d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
											</svg>
											<span>Logout</span>
										</Link>
									</li>
								</ul>
							</li>
              }
              </ul>
					</div>
				</div>
			</nav>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        GetFreshFood
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarAdmin"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarAdmin">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
            >
              Admin
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}
