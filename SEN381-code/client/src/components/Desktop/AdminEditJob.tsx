import { useEffect, useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import { DoOperation, SetTable } from "../../functions/DBOperations";
import LoadingIcon from "../general/LoadingIcon";

interface Props {
  jobId?: number;
  problemId?: number; // Pass the ClientId for editing an existing record
  currentStatus?: string;
  assignedTo?: string;
  description?: string;
  start?: string;
  end?: string;
  onCancel: () => void;
  onSave: () => void;
  // STATUS HISTORY
}

function AdminEditJob({
  jobId,
  problemId,
  currentStatus,
  assignedTo,
  description,
  start,
  end,
  onCancel,
  onSave,
}: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";

  const [techNames, setTechNames] = useState([]);
  const [techEmail, setTechEmail] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const [statusHistory, setStatusHistory] = useState([]);
  const StartRef = useRef(null);
  const EndRef = useRef(null);
  const DescRef = useRef(null);
  const AssRef = useRef(null);
  const statusRef = useRef(null);

  let operation = `${Base_Url}DB/UpdateJobCustom/${jobId}`;
  let fetchMethod = "PUT";

  // Add an onChange event handler to the select element
  function handleSelectChange(event: any) {
    const selectedValue = event.target.value;

    // Find the corresponding key (EmpId) in your data
    const selectedTechnician = techNames.find(
      (technician) => technician["Name"] === selectedValue
    );

    if (selectedTechnician) {
      setSelectedKey(selectedTechnician["EmpId"]);
    } else {
      setSelectedKey(""); // Handle the case when no matching technician is found
    }
  }

  useEffect(() => {
    SetTable(`${Base_Url}DB/GetTechnician`).then((data) => {
      setTechNames(data.slice(0, data.length));
    });
  }, []);

  useEffect(() => {
    const matchingTechnician = techNames.find(
      (technician) => technician["Name"] === assignedTo
    );
    // console.log(JSON.stringify(matchingTechnician));
    if (matchingTechnician) {
      setSelectedKey(matchingTechnician["EmpId"]);
    } else {
      setSelectedKey("");
    }
  }, [techNames]);

  useEffect(() => {
    console.log("SELECTED KEY: " + selectedKey);
  }, [selectedKey]);

  SetTable(`${Base_Url}DB/JDStatus/${jobId}`).then((data) => {
    setStatusHistory(data.slice(0, data.length));
  });

  useEffect(() => {
    console.log(techEmail);
    if (techEmail != "") {
      DoOperation(
        `${Base_Url}mail/SendMail`,
        "POST",
        JSON.stringify({
          email: techEmail,
          subject: "New Job Request",
          text: `Job has been reassigned from ${assignedTo} to you starting from ${
            (StartRef.current as HTMLInputElement | null)?.value
          } to ${
            (EndRef.current as HTMLInputElement | null)?.value
          }. \nBelow is a description: \n\n${
            (DescRef.current as HTMLInputElement | null)?.value
          }\n\nFor any inqueries, please contact this email.\n\nKind Regards`,
        })
      );
    }
  }, [techEmail]);

  if (techNames.length <= 0) {
    return <LoadingIcon />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-[35vw] max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    JobId
                  </label>
                  <input
                    type="number"
                    name="ClientId"
                    id="ClientId"
                    placeholder="Auto generated"
                    readOnly
                    defaultValue={jobId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    ProblemId
                  </label>
                  <input
                    type="number"
                    name="ContractId"
                    id="ContractId"
                    placeholder="Auto generated"
                    readOnly
                    defaultValue={problemId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Current Status
                  </label>
                  <select
                    ref={statusRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={currentStatus}
                  >
                    <option key={"In Progress"} value="In Progress">
                      In Progress
                    </option>
                    <option key={"On Hold"} value="On Hold">
                      On Hold
                    </option>
                    <option key={"Canceled"} value="Canceled">
                      Canceled
                    </option>
                    <option key={"Complete"} value="Complete">
                      Complete
                    </option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Assigned To
                  </label>
                  <select
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={assignedTo}
                    ref={AssRef}
                    onChange={handleSelectChange}
                  >
                    {techNames.map((technician) => (
                      <option
                        key={technician["EmpId"]}
                        value={technician["Name"]}
                      >
                        {`${technician["Name"]}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="Start"
                    id="Start"
                    placeholder="Auto generated"
                    defaultValue={start}
                    ref={StartRef}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="End"
                    id="End"
                    placeholder="Auto generated"
                    defaultValue={end ? end : start}
                    ref={EndRef}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Description
              </label>
              <textarea
                rows={4}
                cols={50}
                ref={DescRef}
                placeholder="No Description Yet"
                defaultValue={description}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Status History
              </label>
              {statusHistory.map((item, index) => (
                <p key={index}>{`${index + 1}: ${item["Status"]}`}</p>
              ))}
            </div>

            <div>
              <GrayButton
                buttonText="Cancel"
                onClickFunction={() => {
                  onCancel();
                }}
                height="5vh"
                width="5vw"
              />
              <button
                className="group relative overflow-hidden rounded-md w-[5vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={async (event) => {
                  await event.preventDefault(); // Prevent the default form submission behavior

                  if (
                    currentStatus !=
                    (StartRef.current as HTMLInputElement | null)?.value
                  ) {
                    await DoOperation(
                      `${Base_Url}DB/InsertJD`,
                      "POST",
                      JSON.stringify({
                        JobId: jobId,
                        Status: (statusRef.current as HTMLInputElement | null)
                          ?.value,
                        Description: null,
                      })
                    );
                  }

                  if (
                    assignedTo !=
                    (AssRef.current as HTMLInputElement | null)?.value
                  ) {
                    // Email new technician
                    await SetTable(`${Base_Url}DB/GetEmpById/${selectedKey}`)
                      .then((data) => {
                        console.log(data[0]["Email"]);
                        setTechEmail(data[0]["Email"]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }

                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      ProblemId: problemId,
                      EmpId: selectedKey,
                      Description: (DescRef.current as HTMLInputElement | null)
                        ?.value,
                      Start: (StartRef.current as HTMLInputElement | null)
                        ?.value,
                      End: (EndRef.current as HTMLInputElement | null)?.value,
                    })
                  );
                  await onSave();
                }}
              >
                Save
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditJob;
