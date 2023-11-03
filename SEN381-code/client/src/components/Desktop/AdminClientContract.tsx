import React, { useEffect, useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import BlueButton from "../general/Buttons/BlueButton";
import { DoOperation, SetTable } from "../../functions/DBOperations";

interface Props {
  clientId?: number; // Pass the ClientId for editing an existing record
  getContracts?: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function AdminClientContract({
  clientId,
  getContracts = "",
  onCancel,
  onSave,
}: Props) {
  const Base_Url = "http://localhost:3000/";
  const [contractData, setContractData] = useState([]);
  const [selectedContract, setSelectedContract] = useState([]);
  const [contractId, setContractId] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    SetTable(getContracts)
      .then((data) => {
        setContractData(data.slice(0, data.length));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [getContracts]);

  useEffect(() => {
    console.log(contractData[0]);
    setSelectedContract(contractData[0]);
  }, [contractData]);

  useEffect(() => {
    console.log(selectedContract);
    // It gives errors when trying to read from selectedContract when it is temporarily in an undefined state.
    if (selectedContract != undefined) {
      setContractId(Object.values(selectedContract)[0] || 0);
      setStart(Object.values(selectedContract)[2] || "No Date");
      setEnd(Object.values(selectedContract)[3] || "No Date");
      setPrice(Object.values(selectedContract)[4] || "");
    }
  }, [selectedContract]);

  let operation = `${Base_Url}DB/InsertClientContract`;
  let fetchMethod = "POST";

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
                    ContractId
                  </label>
                  <input
                    type="number"
                    name="ContractId"
                    id="ContractId"
                    placeholder="Auto generated"
                    readOnly
                    value={contractId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Contract Name
              </label>
              <select
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                defaultValue=""
                onChange={(event) => {
                  // Search fot the correct contract.
                  const selectedValue = parseInt(event.target.value);
                  const selectedContract =
                    contractData.find(
                      (contract) => contract["ContractId"] === selectedValue
                    ) || [];
                  setSelectedContract(selectedContract);
                }}
              >
                {contractData.map((contract) => (
                  <option
                    key={contract["ContractId"]}
                    value={contract["ContractId"]}
                  >
                    {contract["ContractName"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="Start"
                    id="Start"
                    placeholder="Auto generated"
                    readOnly
                    value={start}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    End Date
                  </label>
                  <input
                    type="text"
                    name="End"
                    id="End"
                    placeholder="Auto generated"
                    readOnly
                    value={end}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Price
              </label>
              <input
                type="number"
                name="Price"
                id="Price"
                placeholder="Auto generated"
                readOnly
                value={price}
                className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
              />
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
                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      ClientId: clientId,
                      ContractId: contractId,
                    })
                  );
                  await onSave();
                }}
              >
                Add
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminClientContract;
