import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../layout/MetaData";
import Input from "../../Components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import Loader from "../../layout/Loader/Loader";
import { clearErrors, editProfile } from "../../../actions/userActions";

export default function EditProfile() {
  const location = useLocation();
  const user = location.state.user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, isUpdated } = useSelector((state) => state.editUser);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully!");
      dispatch(clearErrors());
      navigate("/admin/users");
    }
  }, [dispatch, error, isUpdated, alert, navigate]);

  const validate = () => {
    if (!name || !email) {
      alert.error("Name and email are required!");
      return false;
    }

    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(editProfile(user._id, name, email));
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="S3K - Edit Profile" />
      <div className="mt-3 d-flex p-3">
        <div className="shadow card" style={{ width: "40rem" }}>
          <h5 className="card-header">Edit Profile</h5>
          <div className="card-body">
            <form className="d-flex flex-column">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                icon={<CgProfile />}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<HiOutlineMailOpen />}
              />
              <Input
                onChange={() => {}}
                readonly={true}
                placeholder="Contact Number"
                value={user?.contactNumber}
                icon={<MdOutlinePhoneEnabled />}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editDetailsConfirmation"
              >
                Update Details
              </button>
              <br />
              <input
                onClick={() =>
                  navigate(`/admin/user/${user._id}/reset_password`, {
                    state: { user },
                  })
                }
                value="Reset Password"
                className="w-lg-25 btn btn-danger"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      <div
        className="modal fade"
        id="editDetailsConfirmation"
        tabIndex="-1"
        aria-labelledby="editDetailsConfirmationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="editDetailsConfirmationLabel"
              >
                Confirm Edit Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to update the details for the user ?
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
                onClick={submit}
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
}
