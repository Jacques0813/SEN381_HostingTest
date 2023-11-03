import React, { useEffect, useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import BlueButton from "../general/Buttons/BlueButton";
import { DoOperation, SetTable } from "../../functions/DBOperations";

interface Props {
  problemId?: number; // Pass the ClientId for editing an existing record
  createdBy?: number;
  start?: string;
  end?: string;
  onCancel: () => void;
  onSave: (clientId: number) => void;
}

function AdminGetClientContract({
  problemId,
  createdBy,
  start,
  end,
  onCancel,
  onSave,
}: Props) {
  const Base_Url = "http://localhost:3000/";
  const [clientNames, setClientNames] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);

  const [clientId, setClientId] = useState(0);
  const [active, setActive] = useState(null);
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");

  let operation = `${Base_Url}DB/InsertJob`;
  let fetchMethod = "POST";

  useEffect(() => {
    SetTable(`${Base_Url}DB/AllClient`)
      .then((data) => {
        setClientNames(data.slice(0, data.length));
        console.log(data.slice(0, data.length));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(clientNames[0]);
    setSelectedClient(clientNames[0]);
  }, [clientNames]);

  useEffect(() => {
    // console.log(selectedClient);
    // It gives errors when trying to read from selectedContract when it is temporarily in an undefined state.
    if (selectedClient != undefined) {
      setClientId(Object.values(selectedClient)[0] || 0);
      setActive(Object.values(selectedClient)[3] || false);
      setType(Object.values(selectedClient)[2] || "");
      setStreet(Object.values(selectedClient)[8] || "");
      setSuburb(Object.values(selectedClient)[9] || "");
      setCity(Object.values(selectedClient)[10] || "");
    }
  }, [selectedClient]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-[35vw] max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    ClientId
                  </label>
                  <input
                    type="number"
                    name="ClientId"
                    id="ClientId"
                    placeholder="Auto generated"
                    readOnly
                    value={clientId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Active
                  </label>
                  <input
                    type="text"
                    name="Active"
                    id="Active"
                    placeholder="Street"
                    value={String(active)}
                    readOnly
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Client Type
                  </label>
                  <input
                    type="text"
                    name="Type"
                    id="Type"
                    placeholder="Street"
                    value={type}
                    readOnly
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Client Name
                  </label>
                  <select
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue=""
                    onChange={(event) => {
                      // Search fot the correct client.
                      const selectedValue = parseInt(event.target.value);
                      const selectedContract =
                        clientNames.find(
                          (client) => client["ClientId"] === selectedValue
                        ) || [];
                      setSelectedClient(selectedContract);
                    }}
                  >
                    {clientNames.map((client) => (
                      <option
                        key={client["ClientId"]}
                        value={client["ClientId"]}
                      >
                        {`${client["Name"]}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-green-400">
                    Street
                  </label>
                  <input
                    type="text"
                    name="Street"
                    id="Street"
                    placeholder="Street"
                    value={street}
                    readOnly
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-green-400">
                    Suburb
                  </label>
                  <input
                    type="text"
                    name="Suburb"
                    id="Suburb"
                    placeholder="Suburb"
                    value={suburb}
                    readOnly
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-green-400">
                    City
                  </label>
                  <input
                    type="text"
                    name="City"
                    id="City"
                    placeholder="City"
                    value={city}
                    readOnly
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
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
                className="group relative overflow-hidden rounded-md w-[8vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={async (event) => {
                  await event.preventDefault(); // Prevent the default form submission behavior
                  //   await DoOperation(
                  //     operation,
                  //     fetchMethod,
                  //     JSON.stringify({
                  //       ProblemId: problemId,
                  //       EmpId: (TechRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //       CreatedBy: createdBy,
                  //       Description: (DescRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //       Start: (StartRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //       End: (EndRef.current as HTMLInputElement | null)?.value,
                  //     })
                  //   );
                  await onSave(clientId);
                }}
              >
                View Contracts
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminGetClientContract;
