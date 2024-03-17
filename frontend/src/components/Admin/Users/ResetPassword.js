import React, { useState, Fragment, useEffect } from "react";
import Input from "../../Components/Input";
import MetaData from "../../layout/MetaData.js";
import { MdLockOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../../components/layout/Loader/Loader";
import {
  clearErrors,
  resetUserPassword,
} from "../../../actions/userActions.js";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { loading, error, isUpdated } = useSelector(
    (state) => state.resetPassword
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password reset successfully!");
      dispatch(clearErrors());
      navigate("/admin/users");
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  const validate = () => {
    if (password !== confirmPassword) {
      alert.error("Passwords don't match!");
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(resetUserPassword(user._id, password));
  };

  return (
    <Fragment>
      <MetaData title="S3K - Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3 d-flex p-3">
          <div className="shadow card" style={{ width: "40rem" }}>
            <h5 className="card-header">Reset Password</h5>
            <div className="card-body">
              <form className="d-flex flex-column">
                <div className="mb-3">
                  <b>Name: </b> {user.name}<br />
                  <b>Email: </b> {user.email}<br />
                  <b>Contact Number: </b> {user.contactNumber}
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={<RiLockPasswordLine />}
                />
                <Input
                  type="password"
                  icon={<MdLockOutline />}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#resetPasswordConfirmation"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      <div
        className="modal fade"
        id="resetPasswordConfirmation"
        tabIndex="-1"
        aria-labelledby="resetPasswordConfirmationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="resetPasswordConfirmationLabel"
              >
                Confirm Reset Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to reset password for <b>{user.name}</b> ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={submit}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
