import React, { useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import BlueButton from "../general/Buttons/BlueButton";
import { DoOperation } from "../../functions/DBOperations";

interface ClientUserAccountFormProps {
  userId?: number; // Pass the UserID for editing an existing record
  name?: string;
  surname?: string;
  username?: string;
  phone?: string;
  email?: string;
  bankAccount?: string;
  accountHolder?: string;
  bank?: string;
  accountType?: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function ClientUserAccountDetails({
  userId,
  name,
  surname,
  username,
  phone,
  email,
  bankAccount,
  accountHolder,
  bank,
  accountType,
  onCancel,
  onSave,
  isUpdate,
}: ClientUserAccountFormProps) {
  const Base_Url = "http://localhost:3000/";
  const NameRef = useRef(null);
  const SurnameRef = useRef(null);
  const UsernameRef = useRef(null);
  const PhoneRef = useRef(null);
  const EmailRef = useRef(null);
  const AccTypeRef = useRef(null);
  const ActiveRef = useRef(null);
  const TypeRef = useRef(null);
  const BankRef = useRef(null);
  const AccNumRef = useRef(null);
  const AccHoldRef = useRef(null);
  const NotesRef = useRef(null);

  let operation = "";
  let fetchMethod = "";

  if (isUpdate) {
    operation = `${Base_Url}DB/UpdateClientUser/${userId}`;
    fetchMethod = "PUT";
  } else {
    operation = `${Base_Url}DB/InsertClient`;
    fetchMethod = "POST";
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-60vw rounded-lg">
        <div className="mx-auto max-w-550px">
          <form>
            <div
              className="-mx-3 flex flex-wrap"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D] text-center">
                    User ID:
                  </label>
                  <input
                    type="number"
                    name="UserId"
                    id="UserId"
                    placeholder="Auto generated"
                    readOnly
                    value={userId}
                    className={`w-full justify-center items-center text-center rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="flex" style={{ display: "flex", gap: "1dvw" }}>
              <div className="border border-blue-400 w-[100%] px-1 pt-1 rounded-3xl mb-2">
                <h1 className="mb-3 block font-medium text-lg text-blue-500 underline ml-2 text-center">
                  User Details:
                </h1>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="none"
                        ref={NameRef}
                        value={name}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Surname:
                      </label>
                      <input
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder="none"
                        ref={SurnameRef}
                        defaultValue={surname}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Username:
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="none"
                        ref={UsernameRef}
                        defaultValue={username}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Phone:
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="none"
                        ref={PhoneRef}
                        defaultValue={phone}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="none"
                        ref={EmailRef}
                        defaultValue={email}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-blue-400 w-[100%] px-1 pt-1 rounded-3xl mb-2">
                <h1 className="mb-3 block font-medium text-lg text-blue-500 underline ml-2 text-center">
                  Banking Details:
                </h1>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
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

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
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
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="bankAccount"
                        id="bankAccount"
                        ref={AccNumRef}
                        placeholder="none"
                        defaultValue={bankAccount}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Account Holder
                      </label>
                      <input
                        type="text"
                        name="accountHolder"
                        id="accountHolder"
                        ref={AccHoldRef}
                        placeholder="none"
                        defaultValue={accountHolder}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex w-full mt-1dvw"
              style={{
                display: "flex",
                gap: "1dvw",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BlueButton
                buttonText="Save"
                onClickFunction={() => {
                  DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
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
                      Notes: (NotesRef.current as HTMLInputElement | null)
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

export default ClientUserAccountDetails;
