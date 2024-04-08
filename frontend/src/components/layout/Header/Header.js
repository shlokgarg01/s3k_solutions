import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../../actions/userActions";
import { useAlert } from "react-alert";
import logo from "../../../images/logo.png";
import { Enums } from "../../../utils/Enums";
import './Header.css'

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.user);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="d-flex flex-row justify-content-center align-items-center text-decoration-none"
        >
          <img alt="Logo" src={logo} height="40" />
          &ensp;
          <div className="navbar-brand">S3K Business Solutions</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {loading !== true && user && user.role === Enums.USER_ROLES.ADMIN && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/tickets">
                  Queries
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            {loading !== true && user && (
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>{user.name}</b>
                </div>
                <ul className="dropdown-menu custom_dropdown">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={() => {
                        dispatch(adminLogout(user._id));
                        alert.success("Logout Success");
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
