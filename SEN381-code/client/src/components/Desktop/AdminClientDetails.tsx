import { useRef } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import { DoOperation } from "../../functions/DBOperations";

interface Props {
  clientId?: number; // Pass the ClientId for editing an existing record
  name?: string;
  type?: string;
  active?: string;
  bankAccount?: string;
  accountHolder?: string;
  bank?: string;
  accountType?: string;
  street?: string;
  city?: string;
  suburb?: string;
  notes?: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function AdminJobDetails({
  clientId,
  name,
  type,
  active,
  bankAccount,
  accountHolder,
  bank,
  accountType,
  street,
  city,
  suburb,
  notes,
  onCancel,
  onSave,
  isUpdate,
}: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  const AccTypeRef = useRef(null);
  const ActiveRef = useRef(null);
  const TypeRef = useRef(null);
  const BankRef = useRef(null);
  const AccNumRef = useRef(null);
  const AccHoldRef = useRef(null);
  const NotesRef = useRef(null);
  const NameRef = useRef(null);
  const StreetRef = useRef(null);
  const SuburbRef = useRef(null);
  const CityRef = useRef(null);

  let operation = "";
  let fetchMethod = "";

  if (isUpdate) {
    operation = `${Base_Url}DB/UpdateClient/${clientId}`;
    fetchMethod = "PUT";
  } else {
    operation = `${Base_Url}DB/InsertClient`;
    fetchMethod = "POST";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-[70vw] max-w-[80vw]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/4">
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
                    value={!isUpdate ? "" : clientId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Active
                  </label>
                  <select
                    ref={ActiveRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={active}
                  >
                    <option key={"true"} value={"true"}>
                      true
                    </option>
                    <option key={"false"} value={"false"}>
                      false
                    </option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Bank Account Type
                  </label>
                  <select
                    ref={AccTypeRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={accountType}
                  >
                    <option key={"Savings"} value={"Savings"}>
                      Savings
                    </option>
                    <option key={"Current/Cheque"} value={"Current/Cheque"}>
                      Current/Cheque
                    </option>
                    <option key={"Deposit"} value={"Deposit"}>
                      Deposit
                    </option>
                    <option key={"Checking"} value={"Checking"}>
                      Checking
                    </option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Bank
                  </label>
                  <select
                    ref={BankRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={bank}
                  >
                    <option key={"Standard Bank"} value={"Standard Bank"}>
                      Standard Bank
                    </option>
                    <option key={"Absa"} value={"Absa"}>
                      Absa
                    </option>
                    <option key={"FirstRand"} value={"FirstRand"}>
                      FirstRand
                    </option>
                    <option key={"Capitec"} value={"Capitec"}>
                      Capitec
                    </option>
                    <option key={"Investec"} value={"Investec"}>
                      Investec
                    </option>
                    <option key={"FNB"} value={"FNB"}>
                      FNB
                    </option>
                    <option key={"African Bank"} value={"African Bank"}>
                      African Bank
                    </option>
                    <option key={"Nedbank"} value={"Nedbank"}>
                      Nedbank
                    </option>
                    <option key={"Discovery"} value={"Discovery"}>
                      Discovery
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Client Type
                  </label>
                  <select
                    ref={TypeRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    defaultValue={type}
                  >
                    <option key={"Business"} value={"Business"}>
                      Business
                    </option>
                    <option key={"Individual"} value={"Individual"}>
                      Individual
                    </option>
                  </select>
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={NameRef}
                    placeholder="Client Name"
                    defaultValue={!isUpdate ? "" : name}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    id="bankAccount"
                    ref={AccNumRef}
                    placeholder="Account Number"
                    defaultValue={!isUpdate ? "" : bankAccount}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Account Holder
                  </label>
                  <input
                    type="text"
                    name="accountHolder"
                    id="accountHolder"
                    ref={AccHoldRef}
                    placeholder="Account Holder"
                    defaultValue={!isUpdate ? "" : accountHolder}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap pl-3">
              <div className="-mx-3 flex flex-wrap sm:w-1/2">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-green-400">
                      Street
                    </label>
                    <input
                      type="text"
                      name="Street"
                      id="Street"
                      ref={StreetRef}
                      placeholder="Street"
                      defaultValue={!isUpdate ? "" : street}
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/2 pl-4">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-green-400">
                      Suburb
                    </label>
                    <input
                      type="text"
                      name="Suburb"
                      id="Suburb"
                      ref={SuburbRef}
                      placeholder="Suburb"
                      defaultValue={!isUpdate ? "" : suburb}
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
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
                      ref={CityRef}
                      placeholder="City"
                      defaultValue={!isUpdate ? "" : city}
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="ml-[1.2vw] px-3 w-full sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    cols={50}
                    ref={NotesRef}
                    placeholder="No Notes yet"
                    defaultValue={!isUpdate ? "" : notes}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  ></textarea>
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
                className="group relative overflow-hidden rounded-md w-[5vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={async (event) => {
                  await event.preventDefault();
                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      Name: (NameRef.current as HTMLInputElement | null)?.value,
                      Type: (TypeRef.current as HTMLInputElement | null)?.value,
                      Active: JSON.parse(
                        (ActiveRef.current as HTMLInputElement | null)?.value ??
                          "true"
                      ),
                      BankAccount: (
                        AccNumRef.current as HTMLInputElement | null
                      )?.value,
                      AccountHolder: (
                        AccHoldRef.current as HTMLInputElement | null
                      )?.value,
                      Bank: (BankRef.current as HTMLInputElement | null)?.value,
                      AccountType: (
                        AccTypeRef.current as HTMLInputElement | null
                      )?.value,
                      Street: (StreetRef.current as HTMLInputElement | null)
                        ?.value,
                      Suburb: (SuburbRef.current as HTMLInputElement | null)
                        ?.value,
                      City: (CityRef.current as HTMLInputElement | null)?.value,
                      Notes: (NotesRef.current as HTMLInputElement | null)
                        ?.value,
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

export default AdminJobDetails;
