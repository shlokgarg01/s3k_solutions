import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Loader from "../../../components/layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../../actions/userActions.js";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import {
  RiLockPasswordLine,
  RiPhoneLine,
  RiAccountCircleLine,
} from "react-icons/ri";
import Input from "../../Components/Input.js";
import MetaData from "../../layout/MetaData.js";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    loading,
    error,
    isUserCreated
  } = useSelector((state) => state.newUser);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isUserCreated) {
      alert.success("User created successfully!")
      dispatch(clearErrors())
      navigate("/admin/users")
    }
  }, [dispatch, error, alert, navigate, isUserCreated]);

  const validate = () => {
    if (contactNumber.length !== 10) {
      alert.error("Invalid Contact Number");
      return false;
    } else if (password !== confirmPassword) {
      alert.error("Passwords don't match!");
      return false;
    }

    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(register({name, email, contactNumber, password}));
  };

  return (
    <Fragment>
      <MetaData title="S3K - New User" />
      {loading ? (
        <Loader />
      ) : (
        <div
          className="mt-3"
          style={{
            display: "flex",
            // justifyContent: "center",
            // alingItems: "center",
            padding: 20,
          }}
        >
          <div className="shadow card" style={{ width: "40rem" }}>
            <h5 className="card-header">New User</h5>
            <div className="card-body">
              <form onSubmit={submit} className="d-flex flex-column">
                <Input
                  icon={<RiAccountCircleLine />}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  icon={<MdOutlineMailOutline />}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  icon={<RiPhoneLine />}
                  type="tel"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
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
                <input
                  type="submit"
                  value="Create User"
                  className="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
