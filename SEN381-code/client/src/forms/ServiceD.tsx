import { useEffect, useState } from "react";
import Message from "../components/general/Message";
import { GetUserMode } from "../functions/UserMode";
import TableComponent from "../components/general/TableComponent";
import BlueButton from "../components/general/Buttons/BlueButton";
import RedButton from "../components/general/Buttons/RedButton";
import { DoOperation, SetTable } from "../functions/DBOperations";
import Alert from "../components/general/Alerts/Alert";
import AdminAssignJob from "../components/Desktop/AdminAssignJob";
import AdminNavbar from "../components/general/AdminNavbar";
import Prompt from "../components/general/Alerts/Prompt";
import GreenButton from "../components/general/GreenButton";
import AdminEditJob from "../components/Desktop/AdminEditJob";

interface Props {
  id: number;
}

function ServiceD({ id }: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const isMobile = GetUserMode();

  // const [isClientM, setClientM] = useState(true);
  //   const [isContractM, setContractM] = useState(id);
  //   const [isServiceM, setServiceM] = useState(type);

  const [selectedRow, setSelectedRow] = useState({});
  const [rowId, setRowId] = useState(0);
  // const [subId, setSubId] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [rows, setRows] = useState([]);
  const [initialCommand, setInitialCommand] = useState("UnassignedProblem");
  const [dataType, setDataType] = useState("Problem");
  const [statusSearch, setStatusSearch] = useState("");
  const [reloadTable, setReloadTable] = useState(false);

  const [operation, setOperation] = useState("");
  // const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [deleteOperation, setDeleteOperation] = useState(
    `${Base_Url}DB/Delete${dataType}/`
  );
  // const [insertComplete, setInsertComplete] = useState(false);
  // const [updateComplete, setUpdateComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const [assignComplete, setAssignComplete] = useState(false);

  // const [menuOptions, setMenuOptions] = useState([]);
  // const [menuOptionsClick, setMenuOptionsClick] = useState([() => {}]);

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
    console.log(`${Base_Url}DB/${initialCommand}`);
    assignTable(`${Base_Url}DB/${initialCommand}`);
  }, [initialCommand]);

  useEffect(() => {
    console.log(`${Base_Url}DB/${initialCommand}`);
    assignTable(`${Base_Url}DB/${initialCommand}`);
  }, [reloadTable]);

  useEffect(() => {
    if (dataType == "Problem") {
      setInitialCommand(`UnassignedProblem`);
      setDeleteOperation(`${Base_Url}DB/DeleteProblem/`);
      setStatusSearch("");
    } else if (dataType == "Job") {
      setDeleteOperation(`${Base_Url}DB/DeleteJob/`);
      setStatusSearch("In Progress");
    }
  }, [dataType]);

  useEffect(() => {
    if (statusSearch != "") {
      // alert(statusSearch);
      setInitialCommand(`CustomJobFilter/${statusSearch}`);
    }
  }, [statusSearch]);

  useEffect(() => {
    console.log(selectedRow);
    setRowId(Object.values(selectedRow)[0] as number);
  }, [selectedRow]);

  useEffect(() => {
    if (rowId != 0) {
      console.log(rowId);
      if (dataType == "Problem") {
        setStart(Object.values(selectedRow)[4] as string);
        setEnd(Object.values(selectedRow)[5] as string);
      } else {
        setStart(Object.values(selectedRow)[6] as string);
        setEnd(Object.values(selectedRow)[7] as string);
      }
      // console.log("SUBID: " + subId);
      // console.log(("STATUS: " + Object.values(selectedRow)[2]) as string);
    }
  }, [rowId]);

  async function DeleteOperation() {
    if (dataType == "Problem") {
      await DoOperation(
        `${Base_Url}DB/DeleteByProblemId/${rowId}`,
        "DELETE",
        ""
      );
      await DoOperation(`${deleteOperation}${rowId}`, "DELETE", "");
      await assignTable(`${Base_Url}DB/${initialCommand}`);
      await setDeleteComplete(true);
    }
  }

  useEffect(() => {
    if (rowId <= 0 && operation != "Insert") {
      console.log("no row");
    } else if (operation == "Delete") {
      setIsDelete(true);
    } else if (operation == "Assign") {
      setIsAssign(true);
    } else if (operation == "Update") {
      setIsUpdate(true);
    }

    // console.log(operation);
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
          heads={["Service Requests", "Jobs"]}
          functions={[
            () => {
              setDataType("Problem");
            },
            () => {
              setDataType("Job");
            },
          ]}
          id={id}
        ></AdminNavbar>
        <h1 className="inline-block text-3xl font-bold underline text-white ml-[3vw] mt-[1vh] mb-[1vh]">
          {dataType == "Problem" ? "Service Requests" : "Jobs"}
        </h1>
        <div
          className={`inline-block bg-white w-fit ${
            dataType == "Problem" ? "h-[6vh]" : "h-[8vh]"
          } mx-[2vw] my-[1vh] pl-[0.5vw] pr-[1vw] py-[1.5vh] rounded-md`}
        >
          {dataType == "Problem" ? (
            <>
              <BlueButton
                buttonText="Assign"
                onClickFunction={() => {
                  setOperation("Assign");
                }}
                height="3vh"
                width="5vw"
              />
              <RedButton
                buttonText="Close"
                onClickFunction={() => {
                  setOperation("Delete");
                }}
                height="3vh"
                width="5vw"
              />
            </>
          ) : (
            <>
              <h1 className="ml-[1vw] w-[10vw] inline">Status:</h1>
              <select
                // ref={TypeRef}
                className="ml-[1vw] w-[10vw] appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                defaultValue={""}
                onChange={(event) => {
                  // Search fot the correct contract.
                  const selectedValue = event.target.value;
                  setStatusSearch(selectedValue);
                }}
              >
                <option key={"In Progress"} value={"In Progress"}>
                  In Progress
                </option>
                <option key={"On Hold"} value={"On Hold"}>
                  On Hold
                </option>
                <option key={"Canceled"} value={"Canceled"}>
                  Canceled
                </option>
                <option key={"Complete"} value={"Complete"}>
                  Complete
                </option>
                <option key={"None"} value={"None"}>
                  None
                </option>
              </select>
              <GreenButton
                buttonText="Edit Job"
                onClickFunction={() => {
                  setOperation("Update");
                }}
                height="5vh"
                width="5vw"
              />
            </>
          )}
        </div>

        <TableComponent
          key={dataType}
          jsonData={rows}
          onClickFunction={(rowData) => {
            setSelectedRow(rowData);
          }}
          menuOptions={[]}
          menuOptionsClick={[]}
        />

        {isAssign ? (
          <AdminAssignJob
            problemId={rowId}
            createdBy={id}
            end={end ? end.substring(0, 10) : ""}
            start={start ? start.substring(0, 10) : ""}
            onCancel={() => {
              setIsAssign(false);
              assignTable(`${Base_Url}DB/${initialCommand}`);
            }}
            onSave={() => {
              setIsAssign(false);
              assignTable(`${Base_Url}DB/${initialCommand}`);
              setAssignComplete(true);
            }}
          />
        ) : null}

        {isUpdate ? (
          <AdminEditJob
            onCancel={() => {
              setIsUpdate(false);
            }}
            onSave={async () => {
              setIsUpdate(false);
              setReloadTable(!reloadTable);
            }}
            assignedTo={Object.values(selectedRow)[3] as string}
            currentStatus={Object.values(selectedRow)[2] as string}
            description={Object.values(selectedRow)[5] as string}
            end={end ? end.substring(0, 10) : ""}
            jobId={rowId}
            problemId={Object.values(selectedRow)[1] as number}
            start={start ? start.substring(0, 10) : ""}
          />
        ) : null}

        {assignComplete ? (
          <Alert
            type="success"
            title="Assign Complete"
            body="The Service was successfully assigned"
            closed={(close) => {
              setAssignComplete(!close);
            }}
          />
        ) : null}

        {deleteComplete ? (
          <Alert
            type="success"
            title="Closure Complete"
            body="The Service was successfully closed"
            closed={(close) => {
              setAssignComplete(!close);
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
            title="Close service"
            body="Are you sure you want to close this service request? It will delete all corresponding call histories and can't be undone."
            type="warning"
          />
        ) : null}
      </div>
    );
  }
}

export default ServiceD;
