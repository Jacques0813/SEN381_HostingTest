import { useEffect, useState } from "react";
import Message from "../components/general/Message";
import { GetUserMode } from "../functions/UserMode";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/Buttons/BlueButton";
import GrayButton from "../components/general/Buttons/GrayButton";
import RedButton from "../components/general/Buttons/RedButton";
import { DoOperation, SetTable } from "../functions/DBOperations";
import AdminContractDetails from "../components/Desktop/AdminContractDetails";
import AdminServiceDetails from "../components/Desktop/AdminServiceDetails";
import Alert from "../components/general/Alerts/Alert";
import AdminNavbar from "../components/general/AdminNavbar";

interface Props {
  id: number;
}

function ContractD({ id }: Props) {
  const Base_Url = "http://localhost:3000/";
  const isMobile = GetUserMode();

  const [selectedRow, setSelectedRow] = useState({});
  const [rowId, setRowId] = useState(0);
  const [subId, setSubId] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [rows, setRows] = useState([]);
  const [initialCommand, setInitialCommand] = useState("AllContract");
  const [dataType, setDataType] = useState("Contract");

  const [operation, setOperation] = useState("");
  const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteOperation, setDeleteOperation] = useState(
    `${Base_Url}DB/Delete${dataType}/`
  );
  const [ReloadPage, setReloadPage] = useState(false);

  const [insertComplete, setInsertComplete] = useState(false);

  const [menuOptions, setMenuOptions] = useState([
    "View Services",
    //"View Contract",
  ]);
  const [menuOptionsClick, setMenuOptionsClick] = useState([() => {}]);

  function toggleContract() {
    setDataType("Contract");
  }

  function togglePerformance() {
    setDataType("Contract");
  }

  function toggleService() {
    setDataType("Service");
    //setInitialCommand("AllService");
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

  async function DeleteOperation() {
    await DoOperation(`${deleteOperation}`, "DELETE", "");
      //await assignTable(`${Base_Url}DB/${initialCommand}`);
      await setReloadPage(!ReloadPage);
  }

  useEffect(() => {
    console.log(`${Base_Url}DB/${initialCommand}`);
    assignTable(`${Base_Url}DB/${initialCommand}`);
  }, [initialCommand]);

  useEffect(() => {
    assignTable(`${Base_Url}DB/${initialCommand}`);
  }, [ReloadPage]);

  useEffect(() => {
    if (dataType == "Contract") {
      setInitialCommand(`All${dataType}`);
      setDeleteOperation(`${Base_Url}DB/Delete${dataType}/`);
    } else if (dataType == "ServiceContract") {
      //setInitialCommand(`AllService`);
      setInitialCommand(`ServiceByContract/${rowId}`);
      //setDeleteOperation(`${Base_Url}DB/Delete${dataType}`);
      setDeleteOperation(`${Base_Url}DB/DeleteSC/${rowId}/${subId}`);
    } else if (dataType == "Service"){
      setInitialCommand(`All${dataType}`);
      //setDeleteOperation(`${Base_Url}DB/Delete${dataType}/`);
    }
  }, [dataType]);

  useEffect(() => {
    if (rowId != 0) {
      console.log(rowId);
      if (dataType == "Contract") {
          if (endDate !== undefined && endDate !== null) {
            setEndDate(Object.values(selectedRow)[5] as string);
        } else {
          console.log('endDate is not defined');
        }
          if (startDate !== undefined && startDate !== null) {
            setStartDate(Object.values(selectedRow)[4] as string);
        } else {
          console.log('startDate is not defined');
        }
      } 
      console.log("SUBID: " + subId);
      // console.log(("STATUS: " + Object.values(selectedRow)[2]) as string);
    }
  }, [rowId]);

  useEffect(() => {
    console.log(selectedRow);
    setRowId(Object.values(selectedRow)[0] as number);
  }, [selectedRow]);

  useEffect(() => {
    console.log("SubId: ", subId);
  }, [subId]);

  useEffect(() => {
    console.log(rowId);
    setMenuOptionsClick([
      () => {
        setMenuOptions([]);
        setDataType("ServiceContract");
        setSubId(rowId);
      },
    ]);
  }, [rowId]);

  useEffect(() => {
    if (rowId <= 0 && operation != "Insert") {
      console.log("no row");
    } else if (operation == "Delete") {
      DeleteOperation();
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
        {/* <Navbar
          heads={["Contract", "Service"]}
          functions={[toggleContract, toggleService]}
        ></Navbar> */}
        <AdminNavbar
          heads={["Contract", "Contract Performance", "Services"]}
          functions={[toggleContract, togglePerformance, toggleService]}
          id={id}
        />
        <h1
          className="inline-block text-3xl font-bold underline text-white ml-[3vw] mt-[1vh] mb-[1vh] cursor-pointer hover:text-gray-300"
          onClick={() => {
            setDataType("Contract");
            setMenuOptions(["View Services"]);
          }}
        >
          {dataType == "Contract"
            ? "Contract"
            : dataType == "Contract"
            ? `◄ Contract ${rowId}`
            : dataType == "ServiceContract"
            ? "◄ Services"
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
           
          {dataType != "ServiceContract" ? (
            <GrayButton
              buttonText="Edit"
              onClickFunction={() => {
                setOperation("Update");
              }}
              height="3vh"
              width="5vw"
            />
          ) : null}

          {dataType != "Contract" ? (
            <RedButton
            buttonText="Delete"
            onClickFunction={() => {
               setOperation("Delete");
            }}
            height="3vh"
            width="5vw"
          />
          ) : null}

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
          dataType === "Contract" ? (
            <AdminContractDetails
              contractId={rowId}
              createdBy={id}
              contractName={Object.values(selectedRow)[2] as string}
              startDate={startDate ? startDate.substring(0, 10) : ""}
              endDate={endDate ? endDate.substring(0, 10) : ""}
              price={Object.values(selectedRow)[5] as number}
              status={Object.values(selectedRow)[6] as string}
              priority={Object.values(selectedRow)[7] as string}
              isUpdate={isUpdate}
              onCancel={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${initialCommand}`);
              }}
              onSave={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${initialCommand}`);
              }}
            />
          ) : dataType === "ServiceContract" ? ( // Handle Service details
            <AdminServiceDetails
              contractId={rowId}
              contracts={Object.values(selectedRow)[1] as number[]}
              serviceId={rowId}
              serviceName={Object.values(selectedRow)[2] as string}
              price={Object.values(selectedRow)[3] as number}
              description={Object.values(selectedRow)[4] as string}
              isUpdate={isUpdate}
              onCancel={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${initialCommand}`);
              }}
              onSave={() => {
                setIsInsert(false);
                setIsUpdate(false);
                assignTable(`${Base_Url}DB/${initialCommand}`);
              }}
            />
          ) : null
        ) : null}
        {/* <SuccessAlert title="Test success" body="This is a testing success" />
        <InfoAlert title="Test info" body="This is a testing info" />
        <WarningAlert title="Test warning" body="This is a testing warning" />
        <ErrorAlert title="Test error" body="This is a testing error" /> */}

        {insertComplete ? (
          <Alert
            type="warning"
            title="Insert Successful"
            body="The row"
            closed={(close) => {
              setInsertComplete(!close);
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default ContractD;
