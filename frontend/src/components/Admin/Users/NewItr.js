import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Input from "../../Components/Input";
import ItrYears from "../../../utils/Data/ItrYears.json";
import {
  clearErrors,
  uploadItrDocument,
} from "../../../actions/documentActions";

export default function NewItr() {
  const queryParams = useParams();
  let userId = queryParams.id;
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isUploaded } = useSelector(
    (state) => state.uploadDocuments
  );

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    dispatch(uploadItrDocument(userId, name, file));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUploaded) {
      alert.success("Document Uploaded!");
      navigate(`/admin/user/${userId}`);
    }
  }, [error, dispatch, isUploaded]);

  return (
    <div>
      <MetaData title="S3K - New ITR Document" />

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3 d-flex p-3">
          <div className="shadow card" style={{ width: "40rem" }}>
            <h5 className="card-header">ITR Document</h5>
            <div className="card-body">
              <form onSubmit={submit} className="d-flex flex-column">
                <select
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="form-select form-select mb-3"
                >
                  <option value="">Choose ITR Year</option>
                  {Object.keys(ItrYears).map((key, index) => (
                    <option key={index} value={key}>
                      {ItrYears[key]}
                    </option>
                  ))}
                </select>
                <Input
                  type="File"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  type="submit"
                  value="Upload Document"
                  className="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
