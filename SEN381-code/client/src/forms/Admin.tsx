import { useEffect, useState } from "react";
import Message from "../components/general/Message";
import Navbar from "../components/general/Navbar";
import { GetUserMode } from "../functions/UserMode";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/BlueButton";
import GrayButton from "../components/general/GrayButton";
import RedButton from "../components/general/RedButton";
import AdminJobDetails from "../components/Desktop/AdminJobDetails";
import { DoOperation, SetTable } from "../functions/DBOperations";

function Admin() {
  const Base_Url = "http://localhost:3000/";
  const isMobile = GetUserMode();

  // const [isClientM, setClientM] = useState(true);
  // const [isContractM, setContractM] = useState(false);
  // const [isServiceM, setServiceM] = useState(false);

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

  function toggleClient() {
    setDataType("JD");
  }

  function toggleContract() {
    setDataType("Job");
  }

  function toggleService() {
    setDataType("JD");
  }

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
      <div>
        <h1 className="text-3xl font-bold underline">
          This is the MOBILE Admin page
        </h1>
        <h2>example</h2>
        <Message />
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/crafting-tools-blackboard-with-blank-space-center_2101-382.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >
        <Navbar
          heads={["Client", "Contract", "Service"]}
          functions={[toggleClient, toggleContract, toggleService]}
        ></Navbar>
        <h1 className="inline-block text-3xl font-bold underline text-white ml-[3vw] mt-[1vh] mb-[1vh]">
          {dataType == "AllClient"
            ? "Clients"
            : dataType.includes("SelectCUByCId")
            ? `Client ${rowId}'s users`
            : dataType == "AllClientContract"
            ? "Client's contracts"
            : "Undefined"}
        </h1>
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
  }
}

export default Admin;
