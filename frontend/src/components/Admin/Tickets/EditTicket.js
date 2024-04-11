import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getTicketInfo,
  updateTicketStatus,
} from "../../../actions/ticketActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Capitalize } from "../../../helpers/StringHelpers";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader/Loader";
import Input from "../../Components/Input";
import { MdOutlineSubtitles } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Enums } from "../../../utils/Enums";

export default function EditTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = useParams();
  let userId = queryParams.id;
  const [status, setStatus] = useState();
  const alert = useAlert();
  const { loading, error, ticket } = useSelector((state) => state.ticket);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updatedTicket);

  useEffect(() => {
    dispatch(getTicketInfo(userId));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } else if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Status Updated");
      dispatch(clearErrors());
      navigate("/admin/tickets");
    }
  }, [dispatch, alert, error, isUpdated]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(updateTicketStatus(ticket._id, status));
  };

  return (
    <>
      <MetaData title="Edit Ticket" />
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <div className="mt-3 d-flex p-3">
          <div className="shadow card" style={{ width: "34rem" }}>
            <h5 className="card-header">
              Ticket ({ticket?.status && Capitalize(ticket?.status)})
            </h5>
            <div className="card-body">
              <form className="d-flex flex-column" onSubmit={submit}>
                <Input
                  onChange={() => {}}
                  readonly={true}
                  placeholder="Client Name"
                  value={ticket?.user?.name}
                  icon={<CgProfile />}
                />
                <Input
                  onChange={() => {}}
                  readonly={true}
                  placeholder="Title"
                  value={ticket?.title}
                  icon={<MdOutlineSubtitles />}
                />
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    if="ticket_message"
                    style={{ height: 140 }}
                    disabled
                    value={ticket?.message}
                  />
                  <label htmlFor="ticket_message">Message</label>
                </div>

                {ticket?.status !== Enums.TICKET_STATUS.CLOSED && (
                  <>
                    <div className="input-group mb-3">
                      <div className="input-group mb-3">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-select form-select"
                        >
                          <option value="">Choose Status</option>
                          {ticket?.status === Enums.TICKET_STATUS.NEW && (
                            <>
                              <option value={Enums.TICKET_STATUS.ACKNOWLEDGED}>
                                Acknowledged
                              </option>
                            </>
                          )}

                          {ticket?.status ===
                            Enums.TICKET_STATUS.ACKNOWLEDGED && (
                            <>
                              <option value={Enums.TICKET_STATUS.CLOSED}>
                                Closed
                              </option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-primary"
                    />
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
