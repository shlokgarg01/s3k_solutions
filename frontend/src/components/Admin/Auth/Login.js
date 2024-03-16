import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../../components/layout/Loader/Loader.js";
import { useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../actions/userActions.js";
import { useAlert } from "react-alert";
import Input from "../../Components/Input.js";

const Login = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("Login Success!");
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, isAuthenticated, contactNumber, navigate]);

  const submit = (e) => {
    e.preventDefault();

    dispatch(login(contactNumber, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
            padding: 20,
          }}
        >
          <div className="shadow card" style={{ width: "40rem" }}>
            <h5 className="card-header text-center">LOGIN</h5>
            <div className="card-body">
              <form onSubmit={submit} className="d-flex flex-column">
                <Input
                  icon={<MdOutlineMailOutline />}
                  type="tel"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
                <Input
                  icon={<RiLockPasswordLine />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
