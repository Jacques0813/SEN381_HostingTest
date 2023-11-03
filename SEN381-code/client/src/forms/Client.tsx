import React, { useEffect, useState } from "react";
import Message from "../components/general/Message";
import Navbar from "../components/general/Navbar";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/Buttons/BlueButton";
import BackgroundImage from "../assets/BGPic.jpg";
import { GetUserMode } from "../functions/UserMode";
import { DoOperation, SetTable } from "../functions/DBOperations";
import ClientUserAccountDetails from "../components/Desktop/ClientUserAccoutDetails";

function Client() {
  const Base_Url = "http://localhost:3000/";

  interface SelectedRowType {
    Name: string;
    Surname: string;
  }

  const isMobile = GetUserMode();

  // State variables
  const [isHome, setHome] = useState(true);
  const [isAbout, setAbout] = useState(false);
  const [isHelp, setHelp] = useState(false);
  const [isAccount, setAccount] = useState(false);
  const [isService, setService] = useState(false);
  const [isContracts, setContracts] = useState(false);
  const [isMakeCall, setMakeCall] = useState(false);

  const [rows, setRows] = useState<SelectedRowType[]>([]); // Initialize as an empty array
  const [dataType, setDataType] = useState("Service");
  const [selectedRow, setSelectedRow] = useState<SelectedRowType | null>(null); // Initialize as null
  const [rowId, setRowId] = useState(0);
  const [userId, setUserId] = useState(1);
  const [operation, setOperation] = useState("");
  const [edited, setEdited] = useState(false);
  const [initialCommand, setInitialCommand] = useState("");
  const [deleteOperation, setDeleteOperation] = useState(
    `${Base_Url}DB/Delete${dataType}/`
  );

  // Background image style
  const divStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Navigation functions
  function toggleHome() {
    setHome(true);
    setAbout(false);
    setHelp(false);
    setAccount(false);
    setService(false);
    setContracts(false);
    setMakeCall(false);
  }

  function toggleAbout() {
    setAbout(true);
    setHome(false);
    setHelp(false);
    setAccount(false);
    setService(false);
    setContracts(false);
    setMakeCall(false);
  }

  function toggleHelp() {
    setHelp(true);
    setHome(false);
    setAbout(false);
    setAccount(false);
    setService(false);
    setContracts(false);
    setMakeCall(false);
  }

  async function toggleAccount() {
    setAccount(true);
    setHome(false);
    setAbout(false);
    setHelp(false);
    setService(false);
    setContracts(false);
    setMakeCall(false);
    setDataType("ClientUser");
    setRowId(1);
    setUserId(1);
    // Fetch the user's data by userId and set it in selectedRow
    try {
      const user = await SetTable(`${Base_Url}DB/UserById/${userId}`);
      setSelectedRow(user as unknown as SelectedRowType);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during data fetching
    }
  }

  function toggleServices() {
    setService(true);
    setHome(false);
    setAbout(false);
    setHelp(false);
    setAccount(false);
    setContracts(false);
    setMakeCall(false);
    setDataType("Service");
  }

  function toggleContracts() {
    setContracts(true);
    setHome(false);
    setAbout(false);
    setHelp(false);
    setAccount(false);
    setService(false);
    setMakeCall(false);
    setDataType("Contracts");
  }

  function toggleCall() {
    setMakeCall(true);
    setHome(false);
    setAbout(false);
    setHelp(false);
    setAccount(false);
    setService(false);
    setContracts(false);
  }

  // Function to fetch and set table data
  async function assignTable(url: string) {
    try {
      const data = await SetTable(url);
      console.log(data);
      setRows(data);
      setRowId(0);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const tableUrl =
      dataType === "ClientUser"
        ? `${Base_Url}DB/UserById/${userId}`
        : `${Base_Url}DB/All${dataType}`;
    assignTable(tableUrl);
  }, [dataType, userId]);

  useEffect(() => {
    console.log("selectedRow:", selectedRow);
  }, [selectedRow]);

  useEffect(() => {
    console.log("selectedRow:", selectedRow);
  }, [selectedRow]);

  useEffect(() => {
    console.log(rowId);
  }, [rowId]);

  useEffect(() => {
    if (dataType === "Service") {
      setInitialCommand(`All${dataType}`);
    } else if (dataType === "Contracts") {
      setInitialCommand(`All${dataType}`);
    } else if (dataType === "ClientUser") {
      setInitialCommand(`UserById/${userId}`);
      setDeleteOperation(`${Base_Url}DB/Delete${dataType}/`);
    }
  }, [dataType, userId]);

  function testingClick() {}

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
    return (
      <div className="w-full h-screen h-max-[100dvh]" style={divStyle}>
        {/* Render different content based on the active page (isHome, isAbout, etc.) */}
        {isHome && (
          // Home Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <div className="m-4 p-20 rounded">
              <h1 className="text-2xl font-bold text-center text-black">
                Welcome To
              </h1>
              <h2 className="text-5xl font-bold text-center text-black">
                Premier Service Solutions
              </h2>
            </div>
          </div>
        )}
        {isAbout && (
          // About Us Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <div className="bg-white m-4 p-20 rounded">
              <h2 className="text-2xl font-bold text-center text-black mb-5">
                About Us
              </h2>
              <p>
                Lorem ipsum dolor sit amet. Qui eligendi suscipit aut ducimus
                ipsa aut consequuntur quis qui laborum officiis ut praesentium
                architecto et consequuntur quam ut ratione voluptas. Aut fugiat
                possimus et consequatur enim qui rerum incidunt ad temporibus
                alias ea dolor voluptate qui voluptas nulla. Est ipsam quam et
                similique tenetur qui nostrum dolorem cum nulla possimus id
                provident incidunt et quibusdam omnis cum voluptate sunt?
              </p>
              <br />
              {/* Continue with the content */}
            </div>
          </div>
        )}
        {isHelp && (
          // Help Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <div className="bg-white m-4 p-5 rounded">
              <h1 className="text-2xl font-bold text-center text-black mb-8">
                Service Solution Help Page
              </h1>
              
            </div>

            <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 m-4 rounded-lg">
                <form>
                  <div style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"2dvh"
                  }} className="items-center justify-center text-base font-medium text-[#07074D] text-center">
                    <label htmlFor="message">Tell us what you need help with:</label>
                    <textarea name="message" id="message" className="border-[1px] border-gray-500 w-[20dvw] h-[30dvh] mb-3 text-justify"></textarea>
                  </div>

                  <div className="flex items-center justify-center">
                    <BlueButton 
                      buttonText={"Send"} 
                      onClickFunction={testingClick}
                      width="8dvw"    
                      height="5dvh"                
                    />
                  </div>
                </form>
              </div>
          </div>
        )}
        {isAccount && (
          // My Account Page
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "none",
            }}
          >
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <div className="flex-column items-center justify-center rounded w-[80dvw] m-auto mt-[2dvh]">
              {dataType === "ClientUser" && selectedRow && (
                <ClientUserAccountDetails
                  userId={userId}
                  name={selectedRow.Name}
                  surname={selectedRow.Surname}
                  isUpdate={true}
                  onCancel={() => {}}
                  onSave={() => {}}
                />
              )}
            </div>
          </div>
        )}
        {isService && (
          // My Services Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <h2 className="text-2xl font-bold text-center text-black m-8 bg-white rounded p-5">
              My Services History
            </h2>
            <TableComponent
              key={dataType}
              jsonData={rows}
              onClickFunction={testingClick}
              menuOptions={[]}
              menuOptionsClick={[]}
            />
          </div>
        )}
        {isContracts && (
          // My Contracts Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <h2 className="text-2xl font-bold text-center text-black m-8 bg-white rounded p-5">
              My Contracts History
            </h2>
            <TableComponent
              key={dataType}
              jsonData={rows}
              onClickFunction={testingClick}
              menuOptions={[]}
              menuOptionsClick={[]}
            />
          </div>
        )}
        {isMakeCall && (
          // Make a Call Page
          <div>
            <Navbar
              heads={[
                "Home",
                "About Us",
                "Help",
                "My Services",
                "My Contracts",
                "Make a Call",
                "Account",
              ]}
              functions={[
                toggleHome,
                toggleAbout,
                toggleHelp,
                toggleServices,
                toggleContracts,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
            <h2 className="text-2xl font-bold text-center text-black m-8 bg-white rounded p-5">
              Make a Call
            </h2>
            <div className="flex bg-white m-4 p-20 rounded">
              <div className="flex-1 p-4">
                <div>Call Contents</div>
              </div>
              <div className="pr-12">
                <h3 className="text-2xl font-bold text-center text-black m-8 bg-white rounded p-5">
                  Call History
                </h3>
                <div>
                  <p>Call 1: Date, Duration</p>
                  <p>Call 2: Date, Duration</p>
                  <p>Call 3: Date, Duration</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Client;
