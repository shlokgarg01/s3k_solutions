import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, clearErrors } from "../../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { readableDateTimeFromString } from "../../../helpers/DateHelpers";
import { Enums } from "../../../utils/Enums";

const UsersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users, loading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="S3K - All Users" />
      {loading === false && (
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
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Created</th>
                        <th scope="col">Update</th>
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
                          <tr key={index} className="align-middle">
                            <th scope="row">{index + 1}.</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.contactNumber}</td>
                            <td>
                              {readableDateTimeFromString(user.createdAt)}
                            </td>
                            {/* <td
                              className={
                                user.role === "admin"
                                  ? "text-success fw-bold"
                                  : "text-danger"
                              }
                            >
                              {Capitalize(user.role)}
                            </td> */}
                            <td>
                              {user.role === Enums.USER_ROLES.USER ? (
                                <input
                                  onClick={() =>
                                    navigate(
                                      `/admin/user/${user._id}/reset_password`,
                                      { state: { user } }
                                    )
                                  }
                                  value="Change Password"
                                  readOnly
                                  className="w-lg-25 btn btn-sm btn-primary"
                                />
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
    </>
  );
};

export default UsersList;
