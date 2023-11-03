import React, { useState } from "react";
import BlueButton from "./BlueButton";
import GrayButton from "./GrayButton";

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

interface TicketFormProps {
  ticket: Ticket;
  onSave: (editedTicket: Ticket) => void;
  onCancel: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  onSave,
  onCancel,
}) => {
  const [editedTicket, setEditedTicket] = useState({ ...ticket });

  const handleSaveClick = () => {
    onSave(editedTicket);
    onCancel();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setEditedTicket({ ...editedTicket, [field]: e.target.value });
  };

  // CSS styles for full-screen overlay
  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // White background with some transparency
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 9999,
  };
  // CSS styles for the form within the overlay
  const formStyles: React.CSSProperties = {
    width: "90%",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Use a transparent background
    backdropFilter: "blur(10px)", // Apply a blur effect
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "4dvh",
    color: "white",
  };
  const inputSelectStyles: React.CSSProperties = {
    width: "14dvw",
    border: "none",
    borderBottom: "2px solid white",
    background: "transparent",
  };

  const optionDropdownStyle: React.CSSProperties = {
    color: "black",
  };

  return (
    <div style={overlayStyles}>
      <div style={formStyles}>
        <h2
          style={{
            textDecoration: "underline",
          }}
        >
          Basic Details:
        </h2>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1dvh",
              justifyContent: "flex-start",
            }}
          >
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
                background: "transparent",
              }}
            >
              <strong>Ticket Name:</strong>
              <input
                type="text"
                value={editedTicket.ticketName}
                onChange={(e) => handleInputChange(e, "ticketName")}
                style={inputSelectStyles}
              />
            </p>
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
              }}
            >
              <strong>Requester Name:</strong>
              <input
                type="text"
                value={editedTicket.requesterName}
                onChange={(e) => handleInputChange(e, "requesterName")}
                style={inputSelectStyles}
              />
            </p>
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
              }}
            >
              <strong>Date Created:</strong> {editedTicket.dateCreated}
              {editedTicket.dateResponded && (
                <span>
                  {" "}
                  | <strong>Date Responded:</strong>{" "}
                  {editedTicket.dateResponded}
                </span>
              )}
            </p>
          </div>

          <div style={{}}>
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
              }}
            >
              <strong>Priority:</strong>
              <select
                value={editedTicket.status}
                onChange={(e) => handleInputChange(e, "status")}
                style={inputSelectStyles}
              >
                <option value="Low" style={optionDropdownStyle}>
                  Low
                </option>
                <option value="Medium" style={optionDropdownStyle}>
                  Medium
                </option>
                <option value="High" style={optionDropdownStyle}>
                  High
                </option>
              </select>
            </p>
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
              }}
            >
              <strong>Assigned To:</strong>
              <select
                value={editedTicket.assignedTo}
                onChange={(e) => handleInputChange(e, "assignedTo")}
                style={inputSelectStyles}
              >
                <option value="John" style={optionDropdownStyle}>
                  John
                </option>
                <option value="Liam" style={optionDropdownStyle}>
                  Liam
                </option>
                <option value="Kim" style={optionDropdownStyle}>
                  Kim
                </option>
              </select>
            </p>
            <p
              style={{
                display: "flex",
                gap: ".8dvw",
              }}
            >
              <strong>Issue Status:</strong>
              <select
                value={editedTicket.issueStatus}
                onChange={(e) => handleInputChange(e, "issueStatus")}
                style={inputSelectStyles}
              >
                <option value="Open" style={optionDropdownStyle}>
                  Open
                </option>
                <option value="Resolved" style={optionDropdownStyle}>
                  Resolved
                </option>
              </select>
            </p>
          </div>
        </div>

        <h2
          style={{
            textDecoration: "underline",
          }}
        >
          Contact Details:
        </h2>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "1dvw",
          }}
        >
          <p
            style={{
              display: "flex",
              gap: ".8dvw",
              background: "transparent",
            }}
          >
            <strong>Phone Number:</strong>
            <input
              type="text"
              value={editedTicket.phoneNumber}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
              style={inputSelectStyles}
            />
          </p>

          <p
            style={{
              display: "flex",
              gap: ".8dvw",
              background: "transparent",
            }}
          >
            <strong>Email Address:</strong>
            <input
              type="email"
              value={editedTicket.emailAddress}
              onChange={(e) => handleInputChange(e, "emailAddress")}
              style={inputSelectStyles}
            />
          </p>
        </div>

        <h2
          style={{
            textDecoration: "underline",
          }}
        >
          Address:
        </h2>
        <div>
          <p
            style={{
              display: "flex",
              gap: ".8dvw",
            }}
          >
            <strong>Address:</strong>
            <input
              type="text"
              value={editedTicket.address}
              onChange={(e) => handleInputChange(e, "address")}
              style={inputSelectStyles}
            />
          </p>
        </div>

        <h2
          style={{
            textDecoration: "underline",
          }}
        >
          Payment Details:
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1dvh",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              display: "flex",
              gap: ".8dvw",
            }}
          >
            <strong>Account Number:</strong>
            <select
              value={editedTicket.paymentDetails.BankAccount}
              onChange={(e) => handleInputChange(e, "account number")}
              style={inputSelectStyles}
            >
              <option value="Credit Card" style={optionDropdownStyle}>
                Credit Card
              </option>
              <option value="PayPal" style={optionDropdownStyle}>
                PayPal
              </option>
              <option value="MasterCard" style={optionDropdownStyle}>
                MasterCard
              </option>
              <option value="Visa" style={optionDropdownStyle}>
                Visa
              </option>
            </select>
          </p>

          <p
            style={{
              display: "flex",
              gap: ".8dvw",
            }}
          >
            <strong>Account Holder:</strong>
            <input
              type="text"
              value={editedTicket.paymentDetails.AccountHolder}
              onChange={(e) => handleInputChange(e, "Account holder")}
              style={inputSelectStyles}
            />
          </p>

          <p
            style={{
              display: "flex",
              gap: ".8dvw",
            }}
          >
            <strong>Bank:</strong>
            <input
              type="text"
              value={editedTicket.paymentDetails.Bank}
              onChange={(e) => handleInputChange(e, "Bank")}
              style={inputSelectStyles}
            />
          </p>

          <p
            style={{
              display: "flex",
              gap: ".8dvw",
            }}
          >
            <strong>Account Type:</strong>
            <input
              type="text"
              value={editedTicket.paymentDetails.AccountType}
              onChange={(e) => handleInputChange(e, "Account type")}
              style={inputSelectStyles}
            />
          </p>
        </div>

        <div
          className="form-actions"
          style={{
            display: "flex",
            gap: "1dvw",
          }}
        >
          <BlueButton
            buttonText="Save"
            onClickFunction={handleSaveClick}
            width="10dvw"
            height="5dvh"
          />
          <GrayButton
            buttonText="Cancel"
            onClickFunction={onCancel}
            width="10dvw"
            height="5dvh"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
