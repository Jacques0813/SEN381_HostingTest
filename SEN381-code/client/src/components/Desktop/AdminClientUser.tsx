import { useRef } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import { DoOperation } from "../../functions/DBOperations";

interface Props {
  clientId?: number;
  userId?: number;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  position?: string;
  street?: string;
  suburb?: string;
  city?: string;
  notes?: string;
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function AdminClientUser({
  clientId,
  userId,
  city,
  email,
  name,
  notes,
  phone,
  position,
  street,
  suburb,
  surname,
  onCancel,
  onSave,
  isUpdate,
}: Props) {
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";

  const NameRef = useRef(null);
  const SurNameRef = useRef(null);
  const PhoneRef = useRef(null);
  const EmailRef = useRef(null);
  const PositionRef = useRef(null);
  const StreetRef = useRef(null);
  const SuburbRef = useRef(null);
  const CityRef = useRef(null);
  const NotesRef = useRef(null);

  let operation = `${Base_Url}DB/AdminUpdateClientUser/${userId}`;
  let fetchMethod = "PUT";

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-[35vw] max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    UserId
                  </label>
                  <input
                    type="number"
                    name="userId"
                    id="userId"
                    placeholder="Auto generated"
                    readOnly
                    defaultValue={!isUpdate ? "" : userId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    ClientId
                  </label>
                  <input
                    type="number"
                    name="clientId"
                    id="clientId"
                    placeholder="Auto generated"
                    readOnly
                    defaultValue={clientId}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    placeholder="Name"
                    defaultValue={!isUpdate ? "" : name}
                    ref={NameRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="Surname"
                    id="Surname"
                    placeholder="Surname"
                    defaultValue={!isUpdate ? "" : surname}
                    ref={SurNameRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="Phone"
                    id="Phone"
                    placeholder="Phone"
                    defaultValue={!isUpdate ? "" : phone}
                    ref={PhoneRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    id="Email"
                    placeholder="Email"
                    defaultValue={!isUpdate ? "" : email}
                    ref={EmailRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Position
                  </label>
                  <input
                    type="text"
                    name="Position"
                    id="Position"
                    placeholder="Position"
                    defaultValue={!isUpdate ? "" : position}
                    ref={PositionRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Street
                  </label>
                  <input
                    type="text"
                    name="Street"
                    id="Street"
                    placeholder="Street"
                    defaultValue={!isUpdate ? "" : street}
                    ref={StreetRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    Suburb
                  </label>
                  <input
                    type="text"
                    name="Suburb"
                    id="Suburb"
                    placeholder="Suburb"
                    defaultValue={!isUpdate ? "" : suburb}
                    ref={SuburbRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-blue-400">
                    City
                  </label>
                  <input
                    type="text"
                    name="City"
                    id="City"
                    placeholder="City"
                    defaultValue={!isUpdate ? "" : city}
                    ref={CityRef}
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Notes
              </label>
              <textarea
                rows={4}
                cols={50}
                placeholder="No Notes yet"
                defaultValue={!isUpdate ? "" : notes}
                ref={NotesRef}
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
                  await event.preventDefault();
                  await DoOperation(
                    operation,
                    fetchMethod,
                    JSON.stringify({
                      UserId: userId,
                      Position: (PositionRef.current as HTMLInputElement | null)
                        ?.value,
                      Name: (NameRef.current as HTMLInputElement | null)?.value,
                      Surname: (SurNameRef.current as HTMLInputElement | null)
                        ?.value,
                      Phone: (PhoneRef.current as HTMLInputElement | null)
                        ?.value,
                      Email: (EmailRef.current as HTMLInputElement | null)
                        ?.value,
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

export default AdminClientUser;
