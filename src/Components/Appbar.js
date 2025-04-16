import React, { useState } from "react";
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
						<span className="fs-3 fw-bold">GetFreshFood Admin</span>
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
										<path fillRule="evenodd"
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
									<img className="profile rounded-circle d-lg-block mx-auto" width="50" height="50"
										src="#"
										alt="Profile" />
								</Link>
								<ul className="dropdown-menu rounded-0" data-bs-toggle="collapse"
									data-bs-target="#collapseExample">
									<li>
										<Link className="dropdown-item" to="#">
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  											<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
											<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
										</svg>
											<span>Settings</span>
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="#">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
												fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
												<path fillRule="evenodd"
													d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
												<path fillRule="evenodd"
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
