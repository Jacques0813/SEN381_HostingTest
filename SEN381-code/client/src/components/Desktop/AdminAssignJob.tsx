import { useEffect, useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import { DoOperation, SetTable } from "../../functions/DBOperations";

interface Props {
  problemId?: number; // Pass the ClientId for editing an existing record
  createdBy?: number;
  start?: string;
  end?: string;
  onCancel: () => void;
  onSave: () => void;
}

function AdminAssignJob({
  problemId,
  createdBy,
  start,
  end,
  onCancel,
  onSave,
}: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const [techNames, setTechNames] = useState([]);
  const [techEmail, setTechEmail] = useState("");
  const TechRef = useRef(null);
  const StartRef = useRef(null);
  const EndRef = useRef(null);
  const DescRef = useRef(null);

  let operation = `${Base_Url}DB/InsertJob`;
  let fetchMethod = "POST";

  SetTable(`${Base_Url}DB/GetTechnician`).then((data) => {
    setTechNames(data.slice(0, data.length));
  });

  useEffect(() => {
    if (techEmail != "") {
      // alert("TECH EMAIL: " + techEmail);
      DoOperation(
        `${Base_Url}mail/SendMail`,
        "POST",
        JSON.stringify({
          email: techEmail,
          subject: "New Job Request",
          text: `You have been assigned to do a new job from ${
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
                    defaultValue=""
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
                    CreatedBy
                  </label>
                  <input
                    type="number"
                    name="ClientId"
                    id="ClientId"
                    placeholder="Auto generated"
                    readOnly
                    defaultValue={createdBy}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Technician
                  </label>
                  <select
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue=""
                    ref={TechRef}
                  >
                    {techNames.map((technician) => (
                      <option
                        key={technician["EmpId"]}
                        value={technician["EmpId"]}
                      >
                        {`${technician["Name"]} ${technician["Surname"]}`}
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
                defaultValue=""
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              ></textarea>
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
                  await SetTable(
                    `${Base_Url}DB/GetEmpById/${
                      (TechRef.current as HTMLInputElement | null)?.value
                    }`
                  )
                    .then((data) => {
                      console.log(data[0]["Email"]);
                      setTechEmail(data[0]["Email"]);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      ProblemId: problemId,
                      EmpId: (TechRef.current as HTMLInputElement | null)
                        ?.value,
                      CreatedBy: createdBy,
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
                Assign
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAssignJob;
