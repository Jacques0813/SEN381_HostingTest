import { useRef } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import BlueButton from "../general/Buttons/BlueButton";
import { DoOperation } from "../../functions/DBOperations";

interface ContractFormProps {
  contractId: number; // Pass the ContractId for editing an existing record
  createdBy: number;
  contractName: string;
  startDate: string;
  endDate: string;
  price: number;
  status: string;
  priority: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function AdminContractDetails({
  contractId,
  createdBy,
  contractName,
  startDate,
  endDate,
  price,
  status,
  priority,
  onCancel,
  onSave,
  isUpdate,
}: ContractFormProps) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";

  const contractIdRef = useRef(null);
  const createdByRef = useRef(null);
  const contractNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const priceRef = useRef(null);
  const statusRef = useRef(null);
  const priorityRef = useRef(null);

  let operation = "";
  let fetchMethod = "";

  if (isUpdate) {
    operation = `${Base_Url}DB/UpdateContract/${contractId}`;
    fetchMethod = "PUT";
  } else {
    operation = `${Base_Url}DB/InsertContract`;
    fetchMethod = "POST";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
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
                    ref={contractIdRef}
                    value={contractId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Created By
                  </label>
                  <input
                    type="number"
                    name="lName"
                    id="lName"
                    placeholder=""
                    readOnly
                    ref={createdByRef}
                    value={createdBy}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Contract Name
              </label>
              <input
                type="text"
                name="contractName"
                id="contractName"
                ref={contractNameRef}
                placeholder="Contract Name"
                defaultValue={contractName}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Start Date
              </label>
              <input
                type="Date"
                name="StartDate"
                id="StartDate"
                ref={startDateRef}
                defaultValue={startDate}
                placeholder="Start Date"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                End Date
              </label>
              <input
                type="Date"
                name="EndDate"
                id="EndDate"
                ref={endDateRef}
                defaultValue={endDate}
                placeholder="End Date"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  id="Price"
                  placeholder="1"
                  min="1"
                  defaultValue={price}
                  readOnly={isUpdate}
                  ref={priceRef}
                  className={`w-full rounded-md border border-[#e0e0e0] ${
                    isUpdate
                      ? "bg-gray-300"
                      : "bg-white focus:border-blue-600 focus:shadow-md"
                  }  py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Status
              </label>
              <select
                ref={statusRef}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                defaultValue={status}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Priority
              </label>
              <select
                ref={priorityRef}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                defaultValue={priority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <GrayButton
                buttonText="Cancel"
                onClickFunction={() => onCancel()}
                height="12"
                width="32"
              />
              <BlueButton
                buttonText="Save"
                onClickFunction={() => {
                  DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      ContractName: (
                        contractNameRef.current as HTMLInputElement | null
                      )?.value,
                      Status: (statusRef.current as HTMLInputElement | null)
                        ?.value,
                      Priority: (priorityRef.current as HTMLInputElement | null)
                        ?.value,
                      CreatedBy: (
                        createdByRef.current as HTMLInputElement | null
                      )?.value,
                      StartDate: (
                        startDateRef.current as HTMLInputElement | null
                      )?.value,
                      EndDate: (endDateRef.current as HTMLInputElement | null)
                        ?.value,
                      Price: (priceRef.current as HTMLInputElement | null)
                        ?.value,
                    })
                  );
                  onSave();
                }}
                height="12"
                width="32"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminContractDetails;
