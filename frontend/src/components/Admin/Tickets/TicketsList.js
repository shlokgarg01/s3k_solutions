import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllTickets } from "../../../actions/ticketActions";
import Loader from "../../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Capitalize } from "../../../helpers/StringHelpers";
import MetaData from "../../layout/MetaData";
import { readableDateTimeFromString } from "../../../helpers/DateHelpers";
import "./Tickets.css";
import { Enums } from "../../../utils/Enums";
import Colors from "../../../utils/Colors";

export default function TicketsList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      alert.error(error);
    }
  }, [error, dispatch, alert, navigate]);

  const DisplayTickets = ({ status, query_tickets }) => (
    <div className="my-5">
      <div className="row m-3">
        <div className="col">
          <div className="card">
            <h5 className="card-header">{Capitalize(status)}</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-responsive">
                <thead>
                  <tr className="text-center">
                    <th scope="col">S.No</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Messagee</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length === 0 ? (
                    <tr>
                      <td className="text-center fw-bold" colSpan={4}>
                        No tickets with status {status}
                      </td>
                    </tr>
                  ) : (
                    query_tickets.map((ticket, index) => (
                      <tr key={index} className="align-middle text-center">
                        <th scope="row">{index + 1}.</th>
                        <td>{ticket.user.name}</td>
                        <td>{ticket.title}</td>
                        <td id="TicketMessage">{ticket.message}</td>
                        <td>{readableDateTimeFromString(ticket.createdAt)}</td>
                        <td
                          style={{
                            color:
                              ticket.status === Enums.TICKET_STATUS.CLOSED
                                ? Colors.GREEN
                                : Colors.RED,
                          }}
                        >
                          {Capitalize(ticket.status)}
                        </td>
                        <td>
                          <input
                            onClick={() =>
                              navigate(`/admin/ticket/${ticket._id}`)
                            }
                            className="btn btn-sm btn-primary"
                            value="View"
                            readOnly
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
      <hr />
    </div>
  );

  return (
    <>
      <MetaData title="All Tickets" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {tickets && (
            <div>
              {Object.keys(tickets).map((key, index) => (
                <DisplayTickets
                  status={key}
                  query_tickets={tickets[key]}
                  key={index}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
