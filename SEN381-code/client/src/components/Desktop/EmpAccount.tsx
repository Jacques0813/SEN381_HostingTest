import { useEffect, useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import { DoOperation, SetTable } from "../../functions/DBOperations";
import UpdatePassword from "./UpdatePassword";
import Alert from "../general/Alerts/Alert";

interface Props {
  id?: number; // Pass the ClientId for editing an existing record
  onCancel: () => void;
  onSave: () => void;
}

function EmpAccount({ id, onCancel, onSave }: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";
  //   const [data, setData] = useState<Data | null>(null);
  const [data, setData] = useState([]);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const UserNameRef = useRef(null);
  const AccTypeRef = useRef(null);
  const BankRef = useRef(null);
  const NameRef = useRef(null);
  const SurNameRef = useRef(null);
  const BankAccountRef = useRef(null);
  const AccHoldRef = useRef(null);
  const PhoneRef = useRef(null);
  const EmailRef = useRef(null);
  const StreetRef = useRef(null);
  const SuburbRef = useRef(null);
  const TaxRef = useRef(null);
  const CityRef = useRef(null);

  let operation = `${Base_Url}DB/UpdateEmployee/${id}`;
  let fetchMethod = "PUT";

  async function fetchData() {
    await SetTable(`${Base_Url}DB/GetEmpById/${id}`).then((data) => {
      console.log(data.slice(0, 1));
      setData(data.slice(0, 1));
    });
  }

  useEffect(() => {
    fetchData();
    console.log(data);
  }, [id]);

  return data.map((val) => (
    <div
      key={1}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-[70vw] max-w-[80vw]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    EmpId
                  </label>

                  <input
                    type="number"
                    name="EmpId"
                    id="EmpId"
                    placeholder="Auto generated"
                    readOnly
                    value={val["EmpId"]}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Username
                  </label>
                  <input
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="None"
                    defaultValue={val["Username"]}
                    ref={UserNameRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
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
                    defaultValue={val["AccountType"]}
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
                    defaultValue={val["Bank"]}
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
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    ref={NameRef}
                    placeholder="Name"
                    defaultValue={val["Name"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="Surname"
                    id="Surname"
                    ref={SurNameRef}
                    placeholder="Surname"
                    defaultValue={val["Surname"]}
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
                    ref={BankAccountRef}
                    placeholder="Account Number"
                    defaultValue={val["BankAccount"]}
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
                    defaultValue={val["AccountHolder"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="Phone"
                    id="Phone"
                    ref={PhoneRef}
                    placeholder="Account Holder"
                    defaultValue={val["Phone"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    id="Email"
                    ref={EmailRef}
                    placeholder="Email"
                    defaultValue={val["Email"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <h1 className="mb-3 block text-base font-medium text-green-400">
                    Street
                  </h1>
                  <input
                    type="text"
                    name="Street"
                    id="Street"
                    ref={StreetRef}
                    placeholder="Street"
                    defaultValue={val["Street"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <h1 className="mb-3 block text-base font-medium text-green-400">
                    Suburb
                  </h1>
                  <input
                    type="text"
                    name="Suburb"
                    id="Suburb"
                    ref={SuburbRef}
                    placeholder="Suburb"
                    defaultValue={val["Suburb"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Tax Number
                  </label>
                  <input
                    type="text"
                    name="Tax"
                    id="Tax"
                    ref={TaxRef}
                    placeholder="Tax"
                    defaultValue={val["TaxNumber"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Password
                  </label>
                  <button
                    className="group relative overflow-hidden rounded-md w-[7vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                    onClick={async (event) => {
                      await event.preventDefault();
                      setIsPasswordChange(true);
                    }}
                  >
                    Change
                    <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
                  </button>
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/4">
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
                    defaultValue={val["City"]}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
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
                className="group relative overflow-hidden rounded-md w-[5vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={async (event) => {
                  await event.preventDefault(); // Prevent the default form submission behavior
                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      Name: (NameRef.current as HTMLInputElement | null)?.value,
                      Surname: (SurNameRef.current as HTMLInputElement | null)
                        ?.value,
                      Username: (UserNameRef.current as HTMLInputElement | null)
                        ?.value,
                      Phone: (PhoneRef.current as HTMLInputElement | null)
                        ?.value,
                      Email: (EmailRef.current as HTMLInputElement | null)
                        ?.value,
                      //PASSWORD?
                      //TITLE?
                      StreetName: (StreetRef.current as HTMLInputElement | null)
                        ?.value,
                      Suburb: (SuburbRef.current as HTMLInputElement | null)
                        ?.value,
                      City: (CityRef.current as HTMLInputElement | null)?.value,
                      BankAccount: (
                        BankAccountRef.current as HTMLInputElement | null
                      )?.value,
                      AccountHolder: (
                        AccHoldRef.current as HTMLInputElement | null
                      )?.value,
                      Bank: (BankRef.current as HTMLInputElement | null)?.value,
                      AccountType: (
                        AccTypeRef.current as HTMLInputElement | null
                      )?.value,
                      TaxNumber: (TaxRef.current as HTMLInputElement | null)
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
      {isPasswordChange ? (
        <UpdatePassword
          onCancel={() => {
            setIsPasswordChange(false);
          }}
          onSave={() => {
            setIsPasswordChange(false);
            setPasswordChanged(true);
          }}
          previous={val["Password"]}
          id={id}
          key={2}
        />
      ) : null}

      {passwordChanged ? (
        <Alert
          type="success"
          title={"Password changed:"}
          body={`The password was successfully changed`}
          closed={(close) => {
            setPasswordChanged(!close);
          }}
        />
      ) : null}
    </div>
  ));
}

export default EmpAccount;
