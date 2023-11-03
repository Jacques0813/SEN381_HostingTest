import React, { useRef, useState } from "react";
import GrayButton from "../general/GrayButton";
import BlueButton from "../general/BlueButton";
import { DoOperation } from "../../functions/DBOperations";
import Alert from "../general/Alerts/Alert";

interface Props {
  previous: string;
  id?: number;
  onCancel: () => void;
  onSave: () => void;
}

function UpdatePassword({ previous, id, onCancel, onSave }: Props) {
  const Base_Url = "http://localhost:3000/";
  const OldRef = useRef(null);
  const NewRef = useRef(null);
  const RepeatRef = useRef(null);

  const [isWrongOld, setIsWrongOld] = useState(false);
  const [isWrongRepeat, setIsWrongRepeat] = useState(false);

  let operation = `${Base_Url}DB/UpdateEmpPassword/${id}`;
  let fetchMethod = "PUT";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="w-full px-3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-black">
                  Old Password
                </label>
                <input
                  type="password"
                  name="Old"
                  id="Old"
                  ref={OldRef}
                  placeholder="Old Password"
                  defaultValue={""}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                />
              </div>
            </div>

            <div className="w-full px-3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-blue-400">
                  New Password
                </label>
                <input
                  type="password"
                  name="New"
                  id="New"
                  ref={NewRef}
                  placeholder="New Password"
                  defaultValue={""}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                />
              </div>
            </div>

            <div className="w-full px-3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-blue-400">
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="Repeat"
                  id="Repeat"
                  ref={RepeatRef}
                  placeholder="Repeat Password"
                  defaultValue={""}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                />
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
                  if (
                    (OldRef.current as HTMLInputElement | null)?.value ==
                    previous
                  ) {
                    if (
                      (RepeatRef.current as HTMLInputElement | null)?.value ==
                      (NewRef.current as HTMLInputElement | null)?.value
                    ) {
                      DoOperation(
                        operation,
                        fetchMethod,
                        JSON.stringify({
                          Password: (NewRef.current as HTMLInputElement | null)
                            ?.value,
                        })
                      );
                      onSave();
                    } else {
                      setIsWrongRepeat(true);
                    }
                  } else {
                    setIsWrongOld(true);
                  }
                }}
              >
                Change
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {isWrongOld || isWrongRepeat ? (
        <Alert
          type="error"
          title={isWrongOld ? "Old Password:" : "Repeat Password:"}
          body={`The ${
            isWrongOld ? "Old Password" : "Repeat Password"
          } you inserted is incorrect`}
          closed={(close) => {
            if (isWrongOld) {
              setIsWrongOld(!close);
            }
            if (isWrongRepeat) {
              setIsWrongRepeat(!close);
            }
          }}
        />
      ) : null}
    </div>
  );
}

export default UpdatePassword;
