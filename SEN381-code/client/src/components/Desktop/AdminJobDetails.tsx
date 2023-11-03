import { useRef } from "react";
import GrayButton from "../general/GrayButton";
import BlueButton from "../general/BlueButton";
import { DoOperation } from "../../functions/DBOperations";

interface JobDescriptionFormProps {
  descriptionId: number; // Pass the DescriptionId for editing an existing record
  jobId: number;
  initialStatus?: string;
  statusOptions: string[];
  initialDescription?: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

// interface JobDescription {
//   DescriptionId: number;
//   JobId: number;
//   Status: string | null;
//   Description: string | null;
// }

function AdminJobDetails({
  descriptionId,
  jobId,
  initialStatus = "",
  initialDescription = "",
  onCancel,
  onSave,
  statusOptions,
  isUpdate,
}: JobDescriptionFormProps) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const jobIdRef = useRef(null);
  const StatusRef = useRef(null);
  const DescRef = useRef(null);

  let operation = "";
  let fetchMethod = "";

  if (isUpdate) {
    operation = `${Base_Url}DB/UpdateJD/${descriptionId}`;
    fetchMethod = "PUT";
  } else {
    operation = `${Base_Url}DB/InsertJD`;
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
                    DescriptionId
                  </label>
                  <input
                    type="number"
                    name="DescriptionId"
                    id="DescriptionId"
                    placeholder="Auto generated"
                    readOnly
                    value={descriptionId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    JobId
                  </label>
                  <input
                    type="number"
                    name="lName"
                    id="lName"
                    placeholder="1"
                    min="1"
                    defaultValue={isUpdate ? jobId : 1}
                    readOnly={isUpdate}
                    ref={jobIdRef}
                    className={`w-full rounded-md border border-[#e0e0e0] ${
                      isUpdate
                        ? "bg-gray-300"
                        : "bg-white focus:border-blue-600 focus:shadow-md"
                    }  py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Status
              </label>
              <select
                ref={StatusRef}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                defaultValue={initialStatus}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Description
              </label>
              <input
                type="text"
                name="Description"
                id="Description"
                ref={DescRef}
                placeholder="No Description"
                defaultValue={initialDescription}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div>
              <GrayButton
                buttonText="Cancel"
                onClickFunction={() => {
                  onCancel();
                  // alert(
                  //   JSON.stringify([
                  //     {
                  //       JobId: (jobIdRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //       Status: (StatusRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //       Issue: (DescRef.current as HTMLInputElement | null)
                  //         ?.value,
                  //     },
                  //   ])
                  // );
                }}
                height="5vh"
                width="5vw"
              />
              <BlueButton
                buttonText="Save"
                onClickFunction={() => {
                  DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      JobId: (jobIdRef.current as HTMLInputElement | null)
                        ?.value,
                      Status: (StatusRef.current as HTMLInputElement | null)
                        ?.value,
                      Description: (DescRef.current as HTMLInputElement | null)
                        ?.value,
                    })
                  );
                  onSave();
                }}
                height="5vh"
                width="5vw"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminJobDetails;
