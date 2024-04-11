import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors, getUserDetails } from "../../../actions/userActions";
import { readableDateTimeFromString } from "../../../helpers/DateHelpers";
import { deleteDocument } from "../../../actions/documentActions";

export default function UserProfile() {
  const queryParams = useParams();
  let userId = queryParams.id;
  const dispatch = useDispatch();
  const alert = useAlert();

  const [file_id, setFileId] = useState("");
  const [doc_type, setDocType] = useState("");

  const { loading, error, user, userDocuments } = useSelector(
    (state) => state.secondaryUser
  );
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deletedDocument);

  useEffect(() => {
    if (userId !== user?._id) {
      dispatch(getUserDetails(userId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Document Deleted. Please refresh the page.");
      dispatch(clearErrors());
    }
  }, [dispatch, error, deleteError, alert, isDeleted]);

  const noDocuments = (documentType) =>
    userDocuments && userDocuments[`${documentType}`].length === 0;

  const deleteDoc = (e) => {
    e.preventDefault();
    dispatch(deleteDocument(userId, doc_type, file_id));
  };

  const ShowDocuments = ({ documentType, newDocUrl, title }) => (
    <div className="col">
      <div className="card">
        <h5 className="card-header">
          {title}
          <ul className="nav float-end">
            <li className="nav-item">
              <Link
                target="_blank"
                to={newDocUrl}
                className="text-decoration-none fw-bold text-success"
              >
                +
              </Link>
            </li>
          </ul>
        </h5>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                {noDocuments(documentType) ? null : (
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Document</th>
                    <th scope="col">Uploaded At</th>
                    <th scope="col">Action</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {noDocuments(documentType) ? (
                  <tr>
                    <td className="text-center fw-bold" colSpan={2}>
                      No Documents Yet
                    </td>
                  </tr>
                ) : (
                  userDocuments &&
                  userDocuments[`${documentType}`]
                    .reverse()
                    .map((document, index) => (
                      <tr key={index} className="align-middle">
                        <th scope="row">{index + 1}.</th>
                        <td>
                          <a
                            className="text-decoration-none"
                            href={document.url}
                            target="_blank"
                          >
                            {document.name}
                          </a>
                        </td>
                        <td scope="row">
                          {readableDateTimeFromString(document.createdAt)}
                        </td>
                        <td>
                          {/* <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDocConfirmation"
                          >
                            Delete
                          </button> */}
                          <input
                            onClick={() => {
                              let id = document.url.split("/").slice(-1)[0];
                              setFileId(id);
                              setDocType(documentType);
                            }}
                            className="btn btn-sm btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDocConfirmation"
                            value="Delete"
                          />
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
  );

  return (
    <div>
      <MetaData title="S3K - User Profile" />
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <>
          <h6 className="mx-4 my-2">
            Documents for - <b>{user?.name}</b>
          </h6>
          <div className="row my-3 mx-1">
            <ShowDocuments
              title="ITR Documents"
              documentType="itr"
              newDocUrl={`/admin/user/${userId}/itr/new`}
            />
          </div>

          <div className="row my-3 mx-1">
            <ShowDocuments
              title="GST Documents"
              documentType="gst"
              newDocUrl={`/admin/user/${userId}/gst/new`}
            />
          </div>

          <div className="row mb-3 mx-1">
            <ShowDocuments
              title="Misc. Documents"
              documentType="misc"
              newDocUrl={`/admin/user/${userId}/misc/new`}
            />
          </div>

          {/* Confirmation Popup */}
          <div
            className="modal fade"
            id="deleteDocConfirmation"
            tabIndex="-1"
            aria-labelledby="deleteDocConfirmationLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="deleteDocConfirmationLabel"
                  >
                    Confirm Delete Document
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete the document (This action
                  cannot be reverted once done) ?
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
                    onClick={deleteDoc}
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
      )}
    </div>
  );
}
