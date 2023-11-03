import React, { useEffect, useState } from "react";
import SelectableTicket from "../components/general/SelectableTicket";
import TicketForm from "../components/general/TicketForm";
import { GetUserMode } from "../functions/UserMode";
import Message from "../components/general/Message";
import Navbar from "../components/general/Navbar";
import BackgroundImage from "../assets/BGPic.jpg";
import SearchOverlay from "../components/general/SearchOverlay";
import { SetTable } from "../functions/DBOperations";
import DataJson from "../testing/JSONdata.json";
import TableComponent from "../components/general/TableComponent";

function Technician() {
  const divStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat-y",
  };

  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const openSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
    setIsHome(true);
  };

  const isMobile = GetUserMode();

  const [isHome, setIsHome] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isContacts, setIsContacts] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isTicketForm, setIsTicketForm] = useState(false);

  function toggleHome() {
    setIsHome(true);
    setIsNew(false);
    setIsSearch(false);
    setIsContacts(false);
    setIsAbout(false);
    setIsTicketForm(false);
  }

  function toggleNew() {
    setIsHome(false);
    setIsNew(true);
    setIsSearch(false);
    setIsContacts(false);
    setIsAbout(false);
    setIsTicketForm(false);
  }

  function toggleSearch() {
    setIsHome(false);
    openSearchOverlay();
    setIsNew(false);
    setIsSearch(true);
    setIsContacts(false);
    setIsAbout(false);
    setIsTicketForm(false);
  }

  function toggleContacts() {
    setIsHome(false);
    setIsNew(false);
    setIsSearch(false);
    setIsContacts(true);
    setIsAbout(false);
    setIsTicketForm(false);
  }

  function toggleAbout() {
    setIsHome(false);
    setIsNew(false);
    setIsSearch(false);
    setIsContacts(false);
    setIsAbout(true);
    setIsTicketForm(false);
  }

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
  //function TicketListComponent() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const base_URL = "http://localhost:3000/";
  useEffect(() => {
    const fetchData = async () => {
      // WITH DBOPERATIONS FUNCTION:
      SetTable(`${base_URL}DB/TechData/10`)
        .then((data) => {
          const transformedTickets = data.slice(0, data.length);
          console.log(transformedTickets);
        })
        .catch((err) => {
          console.log(err);
        });

      // WITHOUT DBOPERATIONS:
      fetch(`${base_URL}DB/JDByJob/2`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const transformedTickets = data.slice(0, data.length);
          console.log(transformedTickets);
        })
        .catch((err) => {
          console.log(err);
        });
      try {
        const dataFromDb1 = await SetTable(`${base_URL}DB/TechData/10`);
        const dataFromDb2 = await fetch(`${base_URL}DB/JDByJob/2`).then(
          (response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          }
        );
        const allData = [...dataFromDb1, ...dataFromDb2];
        const transformedTickets = allData.map((job) => ({
          id: job.JobId,
          ticketName: job.Description,
          requesterName: job.CreatedBy,
          dateCreated: job.Start,
          status: job.Status,
          assignedTo: job.Employee,
          issueStatus: job.contract.Status,
          phoneNumber: job.info.Phone,
          emailAddress: job.info.Email,
          address: job.concatenatedAddress,
          paymentDetails: {
            BankAccount: job.clientinfo.BankAccount,
            AccountHolder: job.clientinfo.AccountHolder,
            Bank: job.clientinfo.Bank,
            AccountType: job.clientinfo.AccountType,
          },
        }));
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (ticketId: number) => {
    const selected = tickets.find((ticket) => ticket.id === ticketId);
    if (selected) {
      setSelectedTicket(selected);
      setIsEditing(true);
    }
  };

  const handleSave = (editedTicket: Ticket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === editedTicket.id ? { ...ticket, ...editedTicket } : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(null);
    setIsEditing(false);
  };

  const handleReply = (ticketId: number) => {
    const selected = tickets.find((ticket) => ticket.id === ticketId);
    if (selected) {
      setSelectedTicket(selected);
    }
  };

  if (isMobile) {
    return (
      <div style={divStyle}>
        <h1 className="text-3xl font-bold underline">
          This is the MOBILE Client page
        </h1>
        <Message />
      </div>
    );
  } else {
    if (isHome) {
      return (
        <div className="page-container w-full h-screen" style={divStyle}>
          <div>
            <Navbar
              heads={["Home", "New", "Search", "About"]}
              functions={[toggleHome, toggleNew, toggleSearch, toggleAbout]}
            />
          </div>
          <div
            className="tickets-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Ticket Dashboard:
            </h1>
            <div
              className="tickets-list"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1dvh",
              }}
            >
              {tickets.map((ticket) => (
                <SelectableTicket
                  key={ticket.id}
                  ticket={ticket}
                  onSave={handleSave}
                  onCancel={() => setSelectedTicket(null)}
                  onClick={() => handleEdit(ticket.id)}
                  onReply={function (ticketId: number): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
              {isEditing && selectedTicket && (
                <TicketForm
                  ticket={selectedTicket}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              )}
            </div>
          </div>
        </div>
      );
    } else if (isAbout) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "New", "Search", "About"]}
              functions={[toggleHome, toggleNew, toggleSearch, toggleAbout]}
            />
          </div>

          <div className="bg-white m-4 p-20 rounded">
            <h2 className="text-2xl font-bold text-center text-black mb-5">
              About Us
            </h2>
            <p>
              Lorem ipsum dolor sit amet. Qui eligendi suscipit aut ducimus ipsa
              aut consequuntur quis qui laborum officiis ut praesentium
              architecto et consequuntur quam ut ratione voluptas. Aut fugiat
              possimus et consequatur enim qui rerum incidunt ad temporibus
              alias ea dolor voluptate qui voluptas nulla. Est ipsam quam et
              similique tenetur qui nostrum dolorem cum nulla possimus id
              provident incidunt et quibusdam omnis cum voluptate sunt?
            </p>
            <br />
            <p>
              Quo amet itaque ea facilis magni eos omnis repudiandae in facilis
              aspernatur non harum quas quo velit totam? Quo voluptates dolorem
              sit dicta quisquam sit recusandae eius sed distinctio dolor est
              voluptatibus minus aut cupiditate dolor ab iusto rerum. Aut
              delectus dolore sed fugiat incidunt qui quis voluptate. Sed quam
              asperiores eos quia vero vel corrupti laudantium aut rerum ratione
              in facilis expedita.
            </p>
            <br />
            <p>
              A harum dolor qui dicta quia qui harum iste sed deserunt provident
              hic molestiae galisum. Eos fugiat odio non excepturi assumenda a
              assumenda natus cum rerum ipsam et beatae maiores. In odio
              assumenda qui dicta quia non dolorem amet ut dolorem doloribus ea
              asperiores veritatis et deserunt rerum ut quas fugiat.
            </p>
          </div>
        </div>
      );
    } else if (isContacts) {
      return (
        <div>
          <Navbar
            heads={["Home", "New", "Search", "About"]}
            functions={[toggleHome, toggleNew, toggleSearch, toggleAbout]}
          />
        </div>
      );
    } else if (isTicketForm) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <Navbar
            heads={["Home", "New", "Search", "About"]}
            functions={[toggleHome, toggleNew, toggleSearch, toggleAbout]}
          />
          <div></div>
        </div>
      );
    } else if (isSearchOverlayOpen) {
      return (
        <div className="page-container w-full h-screen" style={divStyle}>
          <div>
            <Navbar
              heads={["Home", "New", "Search", "About"]}
              functions={[toggleHome, toggleNew, toggleSearch, toggleAbout]}
            />
          </div>
          {isSearchOverlayOpen && (
            <SearchOverlay
              onClose={closeSearchOverlay}
              onSearch={(searchTerm: string) => {
                const searchResults = tickets.filter((ticket) => {
                  const searchTermLower = searchTerm.toLowerCase();
                  return (
                    ticket.id
                      .toString()
                      .toLowerCase()
                      .includes(searchTermLower) ||
                    ticket.ticketName.toLowerCase().includes(searchTermLower) ||
                    ticket.requesterName
                      .toLowerCase()
                      .includes(searchTermLower) ||
                    ticket.dateCreated
                      .toLowerCase()
                      .includes(searchTermLower) ||
                    ticket.status.toLowerCase().includes(searchTermLower) ||
                    ticket.assignedTo.toLowerCase().includes(searchTermLower) ||
                    ticket.issueStatus
                      .toLowerCase()
                      .includes(searchTermLower) ||
                    ticket.emailAddress.toLowerCase().includes(searchTermLower)
                  );
                });
                setTickets(searchResults);
              }}
            />
          )}
          <div>
            <h2>Tickets</h2>
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id}>{ticket.ticketName}</li>
                // Render other ticket properties as needed
              ))}
            </ul>
          </div>
          <div
            className="tickets-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Render the updated ticket list here */}
          </div>
        </div>
      );
    }
  }
}
//}
export default Technician;
