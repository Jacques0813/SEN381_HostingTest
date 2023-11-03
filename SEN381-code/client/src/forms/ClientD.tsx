import { useEffect, useState } from "react";
import Message from "../components/general/Message";
import { GetUserMode } from "../functions/UserMode";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/Buttons/BlueButton";
import GrayButton from "../components/general/Buttons/GrayButton";
import RedButton from "../components/general/Buttons/RedButton";
import { DoOperation, SetTable } from "../functions/DBOperations";
import AdminClientDetails from "../components/Desktop/AdminClientDetails";
import Alert from "../components/general/Alerts/Alert";
import AdminClientContract from "../components/Desktop/AdminClientContract";
import AdminNavbar from "../components/general/AdminNavbar";
import AdminGetClientContract from "../components/Desktop/AdminGetClientContract";
import Prompt from "../components/general/Alerts/Prompt";

interface Props {
  id: number;
}

function ClientD({ id }: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const isMobile = GetUserMode();

  // const [isClientM, setClientM] = useState(true);
  // const [isContractM, setContractM] = useState(id);

  const [selectedRow, setSelectedRow] = useState({});
  const [rowId, setRowId] = useState(0);
  const [subId, setSubId] = useState(0);
  const [name, setName] = useState("");

  const [rows, setRows] = useState([]);
  const [initialCommand, setInitialCommand] = useState("AllClient");
  const [dataType, setDataType] = useState("Client");

  const [operation, setOperation] = useState("");
  const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [deleteOperation, setDeleteOperation] = useState(
    `${Base_Url}DB/Delete${dataType}/`
  );
  const [insertComplete, setInsertComplete] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);

  const [findContract, setFindContract] = useState(false);

  const [menuOptions, setMenuOptions] = useState(["View Contracts"]);
  const [menuOptionsClick, setMenuOptionsClick] = useState([() => {}]);

  function toggleClient() {
    setDataType("Client");
  }

  function toggleContract() {
    if (dataType != "ClientContract") {
      setFindContract(true);
    }
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
    // console.log(`${Base_Url}DB/${initialCommand}`);
    assignTable(`${Base_Url}DB/${initialCommand}`);
  }, [initialCommand]);

  useEffect(() => {
    if (dataType == "Client") {
      setInitialCommand(`All${dataType}`);
      setDeleteOperation(`${Base_Url}DB/Delete${dataType}/`);
      setMenuOptions(["View Contracts"]);
      // } else if (dataType == "ClientUser") {
      //   setInitialCommand(`SelectCUByCId/${subId}`);
      //   setDeleteOperation(`${Base_Url}DB/Delete${dataType}/`);
    } else if (dataType == "ClientContract") {
      setInitialCommand(`SelectCCByCId/${subId}`);
      setDeleteOperation(`${Base_Url}DB/Delete${dataType}/${subId}/`);
    }
  }, [dataType]);

  useEffect(() => {
    // console.log(selectedRow);
    setRowId(Object.values(selectedRow)[0] as number);
  }, [selectedRow]);

  useEffect(() => {
    // console.log(rowId);
    // console.log("SUBID: " + subId);
    setMenuOptionsClick([
      // () => {
      //   setMenuOptions([]);
      //   setDataType("ClientUser");
      //   setSubId(rowId);
      // },
      () => {
        if (rowId != 0) {
          setMenuOptions([]);
          setDataType("ClientContract");
          setSubId(rowId);
          setName(Object.values(selectedRow)[1] as string);
        }
      },
    ]);
  }, [rowId]);

  useEffect(() => {
    rows.forEach((row) => {
      if (row["ClientId"] == subId) {
        setName(row["Name"]);
      }
    });
  }, [subId]);

  async function DeleteOperation() {
    await setDeleteComplete(true);
    await DoOperation(`${deleteOperation}${rowId}`, "DELETE", "");
    await assignTable(`${Base_Url}DB/${initialCommand}`);
  }

  useEffect(() => {
    if (rowId <= 0 && operation != "Insert") {
      console.log("no row");
    } else if (operation == "Delete") {
      setIsDelete(true);
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

  useEffect(() => {
    if (shouldDelete) {
      DeleteOperation();
      setShouldDelete(false);
    }
  }, [shouldDelete]);

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
        <AdminNavbar
          heads={["Client", "Contracts"]}
          functions={[toggleClient, toggleContract]}
          id={id}
        ></AdminNavbar>
        <h1
          className={`inline-block text-3xl font-bold underline text-white ml-[3vw] mt-[1vh] mb-[1vh] cursor-pointer ${
            dataType != "Client" ? "hover:text-gray-300" : ""
          }`}
          onClick={() => {
            setDataType("Client");
            setMenuOptions(["View Contracts"]);
          }}
        >
          {dataType == "Client"
            ? "Clients"
            : // : dataType == "ClientUser"
            // ? `◄ Client ${subId}'s users`
            dataType == "ClientContract"
            ? `◄ ${name}'s contracts`
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
          {dataType != "ClientContract" ? (
            <GrayButton
              buttonText="Edit"
              onClickFunction={() => {
                setOperation("Update");
              }}
              height="3vh"
              width="5vw"
            />
          ) : null}
          {dataType != "Client" ? (
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
          dataType === "Client" ? (
            <AdminClientDetails
              accountHolder={Object.values(selectedRow)[5] as string}
              accountType={Object.values(selectedRow)[7] as string}
              bank={Object.values(selectedRow)[6] as string}
              bankAccount={Object.values(selectedRow)[4] as string}
              clientId={Object.values(selectedRow)[0] as number}
              notes={Object.values(selectedRow)[11] as string}
              type={Object.values(selectedRow)[2] as string}
              active={Object.values(selectedRow)[3] as string}
              city={Object.values(selectedRow)[10] as string}
              street={Object.values(selectedRow)[8] as string}
              suburb={Object.values(selectedRow)[9] as string}
              name={Object.values(selectedRow)[1] as string}
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
                isInsert ? setInsertComplete(true) : setUpdateComplete(true);
              }}
            />
          ) : dataType === "ClientContract" ? (
            <AdminClientContract
              clientId={subId}
              getContracts={`${Base_Url}DB/UnusedContract/${subId}`}
              isUpdate={isUpdate}
              onCancel={() => {
                assignTable(`${Base_Url}DB/${initialCommand}`);
                setIsInsert(false);
                setIsUpdate(false);
              }}
              onSave={() => {
                assignTable(`${Base_Url}DB/${initialCommand}`);
                isInsert ? setInsertComplete(true) : setUpdateComplete(true);
                setIsInsert(false);
                setIsUpdate(false);
                isInsert ? setInsertComplete(true) : setUpdateComplete(true);
              }}
            />
          ) : null
        ) : null}

        {findContract ? (
          <AdminGetClientContract
            onCancel={() => {
              setFindContract(false);
            }}
            onSave={async (clientId) => {
              setMenuOptions([]);
              setSubId(clientId);
              setDataType("ClientContract");
              setFindContract(false);
            }}
          />
        ) : null}

        {insertComplete || updateComplete || deleteComplete ? (
          <Alert
            type="success"
            title={
              insertComplete
                ? "Insert Complete:"
                : updateComplete
                ? "Update Complete:"
                : "Delete Complete:"
            }
            body={`The row has been successfully ${
              insertComplete
                ? "inserted"
                : updateComplete
                ? "updated"
                : "deleted"
            }`}
            closed={(close) => {
              if (insertComplete) {
                setInsertComplete(!close);
              }
              if (updateComplete) {
                setUpdateComplete(!close);
              }
              if (deleteComplete) {
                setDeleteComplete(!close);
              }
            }}
          />
        ) : null}

        {isDelete ? (
          <Prompt
            closed={(close) => {
              setIsDelete(!close);
            }}
            shouldDelete={(should) => {
              setShouldDelete(should);
            }}
            title="Delete contract"
            body={`Are you sure you want to delete contract ${rowId} for client ${name}? It can't be undone.`}
            type="warning"
          />
        ) : null}
      </div>
    );
  }
}

export default ClientD;
