import React, { useEffect } from "react";
import Metadata from "../components/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, dashboardDetails } from "../actions/userActions";
import Colors from "../utils/Colors";
import { useAlert } from "react-alert";
import Loader from "./layout/Loader/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, adminDetails } = useSelector(
    (state) => state.adminDetails
  );

  const CountContainer = ({ title, count, color }) => (
    <div className="d-flex flex-column justify-content-center align-items-center mx-4">
      <b className="mb-2" style={{ fontSize: 22 }}>
        {title}
      </b>
      <div
        className="rounded-circle fw-bold d-flex flex-row justify-content-center align-items-center"
        style={{
          height: 130,
          width: 130,
          backgroundColor: color,
          fontSize: 34,
        }}
      >
        {count}
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(dashboardDetails());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Metadata title="S3K - Home" />
      <div className="container d-flex flex-row flex-wrap justify-content-center mt-5">
        <CountContainer
          title="Users"
          count={adminDetails?.usersCount}
          color={Colors.LIGHT_GREEN}
        />
        <CountContainer
          title="Total Docs."
          count={adminDetails?.totalDocuments}
          color={Colors.LIGHT_BLUE}
        />
        <CountContainer
          title="ITR Docs."
          count={adminDetails?.itrDocumentsCount}
          color={Colors.LIGHT_RED}
        />
      </div>

      <div className="container d-flex flex-row flex-wrap justify-content-center mt-5">
        <CountContainer
          title="GST Docs."
          count={adminDetails?.gstDocumentsCount}
          color={Colors.LIGHT_YELLOW}
        />
        <CountContainer
          title="Misc. Docs."
          count={adminDetails?.miscDocumentsCount}
          color={Colors.LIGHT_PURPLE}
        />
      </div>
    </>
  );
}
