import Message from "../components/general/Message";
import { GetUserMode } from "../functions/UserMode";
import Navbar from "../components/general/Navbar";
import { useEffect, useState } from "react";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/BlueButton";
import GrayButton from "../components/general/GrayButton";
import RedButton from "../components/general/RedButton";
import { DoOperation, SetTable } from "../functions/DBOperations";
import AdminJobDetails from "../components/Desktop/AdminJobDetails";

function CallCentre() {
  const divStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-photo/crafting-tools-blackboard-with-blank-space-center_2101-382.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
  };

  const isMobile = GetUserMode();

  const [isHome, setHome] = useState(true);
  const [isProblem, setProblem] = useState(false);
  const [isAccount, setAccount] = useState(false);
  const [isClients, setClients] = useState(false);
  const [isMakeCall, setMakeCall] = useState(false);

  function toggleHome() {
    setHome(true);
    setProblem(false);
    setAccount(false);
    setClients(false);
    setMakeCall(false);
  }

  function toggleProblem() {
    setProblem(true);
    setHome(false);
    setAccount(false);
    setClients(false);
    setMakeCall(false);
  }

  function toggleClients() {
    setClients(true);
    setHome(false);
    setProblem(false);
    setAccount(false);
    setMakeCall(false);

    setDataType("AllClient");
  }

  function toggleAccount() {
    setAccount(true);
    setHome(false);
    setProblem(false);
    setClients(false);
    setMakeCall(false);
  }

  function toggleCall() {
    setMakeCall(true);
    setHome(false);
    setProblem(false);
    setAccount(false);
    setClients(false);
  }

  const [problem, setProblemStatement] = useState("");
  const [employee, setEmployee] = useState("");

  const GetProblemSatement = (event: any) => {
    const newProblem = event.target.value;
    setProblemStatement(newProblem);
  };

  const GetEmployeeName = (event: any) => {
    const empName = event.target.value;
    setEmployee(empName);
  };

  function testingClick() {}

  function SubmitProblem() {
    console.log(problem + "\n" + employee);
  }

  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const [selectedRow, setSelectedRow] = useState({});
  const [rowId, setRowId] = useState(0);

  const [rows, setRows] = useState([]);
  const [dataType, setDataType] = useState("AllClient");

  const [operation, setOperation] = useState("");
  const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [menuOptions, setMenuOptions] = useState([
    "View users",
    "View Contracts",
  ]);
  const [menuOptionsClick, setMenuOptionsClick] = useState([() => {}]);

  async function assignTable(url: string) {
    await SetTable(url)
      .then((data) => {
        console.log(data);
        setRows(data.slice(0, data.length));
      })
      .catch((error) => {
        console.error(error);
      });

    setRowId(0);
  }

  useEffect(() => {
    assignTable(`${Base_Url}DB/${dataType}`);
  }, [dataType]);

  useEffect(() => {
    console.log(selectedRow);
    setRowId(Object.values(selectedRow)[0] as number);
  }, [selectedRow]);

  useEffect(() => {
    console.log(rowId);
    setMenuOptionsClick([
      () => {
        setDataType(`SelectCUByCId/${rowId}`);
        setMenuOptions([]);
      },
      () => {
        setDataType(`SelectCCByCId/${rowId}`);
        setMenuOptions([]);
      },
    ]);
  }, [rowId]);

  useEffect(() => {
    if (rowId <= 0 && operation != "Insert") {
      console.log("no row");
    } else if (operation == "Delete") {
      DoOperation(`${Base_Url}DB/Delete${dataType}/${rowId}`, "DELETE", "");
    } else if (operation == "Insert") {
      setIsInsert(true);
      setIsUpdate(false);
    } else if (operation == "Update") {
      setIsUpdate(true);
      setIsInsert(false);
    }

    console.log(operation);
    setOperation("");
  }, [operation]);

  if (isMobile) {
    return (
      <div style={divStyle}>
        <h1 className="text-3xl font-bold underline">
          This is the MOBILE CallCentre page
        </h1>
        <Message />
      </div>
    );
  } else {
    if (isHome) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "Problem", "Clients", "Make a Call", "Account"]}
              functions={[
                toggleHome,
                toggleProblem,
                toggleClients,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
          </div>

          <div className="bg-white m-4 p-20 rounded">
            <h1 className="text-2xl font-bold text-center text-black">
              Welcome To
            </h1>
            <h2 className="text-5xl font-bold text-center text-black">
              Premier Service Solutions
            </h2>
          </div>
        </div>
      );
    } else if (isProblem) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "Problem", "Clients", "Make a Call", "Account"]}
              functions={[
                toggleHome,
                toggleProblem,
                toggleClients,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
          </div>

          <div className="bg-white m-4 p-20 rounded">
            <h1 className="text-2xl font-bold text-center text-black mb-8">
              Service Solution Problem Page
            </h1>
            <div>
              <form action="">
                <div className="flex items-top mb-4 justify-center items-center h-full">
                  <label htmlFor="question" className="mr-10">
                    Please enter your problem:
                  </label>
                  <textarea
                    id="question"
                    required
                    className="w-60 h-24 p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring focus:border-red-300"
                    value={problem}
                    onChange={GetProblemSatement}
                  />
                </div>

                <div className="flex items-top mb-4 justify-center items-center h-full">
                  <label htmlFor="name" className="mr-10">
                    Employee Name:
                  </label>
                  <input
                    id="name"
                    className="mr-10 w-60 p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring focus:border-red-300"
                    value={employee}
                    onChange={GetEmployeeName}
                  />
                </div>

                <div className="flex justify-center items-center h-full mt-10">
                  <BlueButton
                    buttonText="Submit Problem"
                    onClickFunction={SubmitProblem}
                    height="5vh"
                    width="10vw"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (isAccount) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "Problem", "Clients", "Make a Call", "Account"]}
              functions={[
                toggleHome,
                toggleProblem,
                toggleClients,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
          </div>

          <div className="bg-white m-4 p-20 rounded">
            <h2 className="text-2xl font-bold text-center text-black mb-8">
              My Account
            </h2>
            <div>
              <div>
                <h2 className="text-lg font-bold text-center text-black mb-8">
                  Contact Details
                </h2>
                <div>
                  <p>Company / CallCentre Name:</p>
                  <p>Contact Number:</p>
                  <p>Email Address:</p>
                  <p>PO Box:</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-center text-black mb-8">
                  Address
                </h2>
                <div>
                  <p>Street</p>
                  <p>Suburb</p>
                  <p>City</p>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h2 className="text-lg font-bold text-center text-black mb-8">
                  Payment Details
                </h2>
                <div>
                  <p>Account Number:</p>
                  <p>Account Holder:</p>
                  <p>Bank:</p>
                  <p>Branch:</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-center text-black mb-8">
                  Services
                </h2>
                <div>
                  <p>Service 1</p>
                  <p>Service 2</p>
                  <p>Service 3</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center h-full mt-10">
              <BlueButton
                buttonText="Edit Account"
                onClickFunction={testingClick}
                height="5vh"
                width="10vw"
              />
            </div>
          </div>
        </div>
      );
    } else if (isClients) {
      return (
        <div className="bg-black w-full" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "Problem", "Clients", "Make a Call", "Account"]}
              functions={[
                toggleHome,
                toggleProblem,
                toggleClients,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
          </div>

          <div className="inline-block bg-white w-fit h-[6vh] mx-[2vw] my-[1vh] pl-[0.5vw] pr-[1vw] py-[1.5vh] rounded-md">
            <BlueButton
              buttonText="Add"
              onClickFunction={() => {
                setOperation("Insert");
              }}
              height="3vh"
              width="5vw"
            />
            <GrayButton
              buttonText="Edit"
              onClickFunction={() => {
                setOperation("Update");
              }}
              height="3vh"
              width="5vw"
            />
            <RedButton
              buttonText="Delete"
              onClickFunction={() => {
                setOperation("Delete");
              }}
              height="3vh"
              width="5vw"
            />
          </div>
          <TableComponent
            key={dataType}
            jsonData={rows}
            onClickFunction={(rowData) => {
              setSelectedRow(rowData);
            }}
            menuOptions={menuOptions}
            menuOptionsClick={menuOptionsClick}
          />

          {isInsert || isUpdate ? (
            <AdminJobDetails
              descriptionId={
                isInsert
                  ? parseInt("")
                  : (Object.values(selectedRow)[0] as number)
              }
              jobId={Object.values(selectedRow)[1] as number}
              onCancel={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${dataType}`);
              }}
              onSave={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${dataType}`);
              }}
              initialDescription={Object.values(selectedRow)[3] as string}
              initialStatus={Object.values(selectedRow)[2] as string}
              statusOptions={["Pending", "Completed", "Cancelled"]}
              isUpdate={isUpdate}
            />
          ) : null}
        </div>
      );
    } else if (isMakeCall) {
      return (
        <div className="bg-black w-full h-screen" style={divStyle}>
          <div>
            <div></div>
            <h1></h1>
            <Navbar
              heads={["Home", "Problem", "Clients", "Make a Call", "Account"]}
              functions={[
                toggleHome,
                toggleProblem,
                toggleClients,
                toggleCall,
                toggleAccount,
              ]}
            ></Navbar>
          </div>

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
      );
    }
  }
}

export default CallCentre;
