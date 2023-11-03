import React from "react";

interface Ticket {
  id: number;
  ticketName: string;
  requesterName: string;
  dateCreated: string;
  status: string;
  assignedTo: string;
  issueStatus: string;
  dateResponded?: string; // Optional
  phoneNumber: string;
  emailAddress: string;
  address: string; // Added Address
  paymentDetails: {
    BankAccount: string;
    AccountHolder: string;
    Bank: string;
    AccountType: string;
  };
}

interface Props {
  ticket: Ticket;
  onClick: (ticketId: number) => void;
  onSave: (editedTicket: Ticket) => void;
  onCancel: () => void;
  onReply: (ticketId: number) => void; // Ensure 'onReply' is defined here
}

const SelectableTicket: React.FC<Props> = ({ ticket, onClick }) => {
  const handleTicketClick = () => {
    onClick(ticket.id);
  };

  return (
    <div
      className={`ticket ${
        ticket.issueStatus === "Resolved" ? "resolved" : ""
      }`}
      style={{
        cursor: "pointer",
        width: "80vw",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white", // White background
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Black box shadow
        padding: "2%",
      }}
      onClick={handleTicketClick}
    >
      <div>
        <p>
          <strong>Ticket Name:</strong> {ticket.ticketName}
        </p>
        <p>
          <strong>Requester Name:</strong> {ticket.requesterName}
        </p>
        <p>
          <strong>Date Created:</strong> {ticket.dateCreated}
          {ticket.dateResponded && (
            <span>
              {" "}
              | <strong>Date Responded:</strong> {ticket.dateResponded}
            </span>
          )}
        </p>
      </div>

      <div className="ticket-status">
        <p>
          <strong>Priority:</strong> {ticket.status}
        </p>
        <p>
          <strong>Assigned To:</strong> {ticket.assignedTo}
        </p>
        <p>
          <strong>Issue Status:</strong> {ticket.issueStatus}
        </p>
      </div>
    </div>
  );
};
export default SelectableTicket;
