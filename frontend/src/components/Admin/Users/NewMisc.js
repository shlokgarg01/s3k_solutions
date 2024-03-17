import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Input from "../../Components/Input";
import { FiUsers } from "react-icons/fi";
import {
  clearErrors,
  uploadMiscDocument,
} from "../../../actions/documentActions";

export default function NewMisc() {
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
    dispatch(uploadMiscDocument(userId, name, file));
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
      <MetaData title="S3K - New Misc Document" />

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3 d-flex p-3">
          <div className="shadow card" style={{ width: "40rem" }}>
            <h5 className="card-header">Misc Document</h5>
            <div className="card-body">
              <form onSubmit={submit} className="d-flex flex-column">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Document Name"
                  icon={<FiUsers />}
                  required
                />
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
