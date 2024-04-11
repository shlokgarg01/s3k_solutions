import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  clearErrors,
  userLogout,
} from "../../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { readableDateTimeFromString } from "../../../helpers/DateHelpers";
import { Enums } from "../../../utils/Enums";
import Loader from "../../layout/Loader/Loader";

const UsersList = () => {
  const [userToBeLoggedOut, setUserToBeLoggedOut] = useState(null);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: logoutError,
    loading: logoutLoading,
    isUpdated,
  } = useSelector((state) => state.editUser);

  useEffect(() => {
    if (error || logoutError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Logged out!");
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, alert, logoutError, isUpdated]);

  return (
    <>
      <MetaData title="S3K - All Users" />
      {loading || logoutLoading ? (
        <Loader />
      ) : (
        <div className="row m-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">
                Users
                <ul className="nav float-end">
                  <li className="nav-item">
                    <Link
                      to="/admin/users/new"
                      className="text-decoration-none fw-bold text-success"
                    >
                      +
                    </Link>
                  </li>
                </ul>
              </h5>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-responsive">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Created</th>
                        <th scope="col text-center">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td className="text-center fw-bold" colSpan={7}>
                            No Users Yet
                          </td>
                        </tr>
                      ) : (
                        users.map((user, index) => (
                          <tr key={index} className="align-middle text-center">
                            <th scope="row">{index + 1}.</th>
                            <td>
                              <Link
                                target="_blank"
                                className="text-decoration-none"
                                to={`/admin/user/${user._id}`}
                              >
                                {user.name}
                              </Link>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.contactNumber}</td>
                            <td>
                              {readableDateTimeFromString(user.createdAt)}
                            </td>
                            <td>
                              {user.role === Enums.USER_ROLES.USER ? (
                                <>
                                  <input
                                    onClick={() =>
                                      navigate(`/admin/user/${user._id}/edit`, {
                                        state: { user },
                                      })
                                    }
                                    value="Edit"
                                    readOnly
                                    className="btn btn-sm btn-primary"
                                  />
                                  &emsp;
                                  <input
                                    onClick={() => setUserToBeLoggedOut(user)}
                                    className="btn btn-sm btn-danger"
                                    readOnly
                                    data-bs-toggle="modal"
                                    data-bs-target="#logoutUserConfirmation"
                                    value="Logout"
                                  />
                                </>
                              ) : (
                                "N/A"
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      <div
        className="modal fade"
        id="logoutUserConfirmation"
        tabIndex="-1"
        aria-labelledby="logoutUserConfirmationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutUserConfirmationLabel">
                Confirm Logout
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to logout the user {userToBeLoggedOut?.name}{" "}
              ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={() => dispatch(userLogout(userToBeLoggedOut?._id))}
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
