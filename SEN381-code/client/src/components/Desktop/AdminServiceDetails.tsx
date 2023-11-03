import React, { useRef, useState } from "react";
import GrayButton from "../general/Buttons/GrayButton";
import BlueButton from "../general/Buttons/BlueButton";
import { DoOperation } from "../../functions/DBOperations";

interface ServiceFormProps {
  serviceId: number; // Pass the ServiceId for editing an existing service
  serviceName: string;
  price: number;
  description: string;
  contractId: number;
  contracts: number[]; // Assuming this is an array of available ContractIds
  isUpdate: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function AdminServiceDetails({
  serviceId,
  serviceName,
  price,
  description,
  contractId,
  contracts,
  onCancel,
  onSave,
  isUpdate,
}: ServiceFormProps) {
  const Base_Url = "http://localhost:3000/";

  const serviceNameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const contractIdRef = useRef(null);

  let operation = "";
  let fetchMethod = "";

  if (isUpdate) {
    operation = `${Base_Url}DB/UpdateService/${serviceId}`;
    fetchMethod = "PUT";
  } else {
    operation = `${Base_Url}DB/InsertService`;
    fetchMethod = "POST";
  }

  const handleSave = () => {
    const serviceData = {
      serviceName: (serviceNameRef.current as HTMLInputElement | null)?.value,
      price: (priceRef.current as HTMLInputElement | null)?.value,//parcetofloat
      description: (descriptionRef.current as HTMLInputElement | null)?.value,
      contractId: (contractIdRef.current as HTMLInputElement | null)?.value,//parcetofloat
    };

    //serviceData object to send the data to your API.
    DoOperation(
      operation,
      fetchMethod,
      JSON.stringify(serviceData)
    );
    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                id="serviceName"
                ref={serviceNameRef}
                placeholder="Service Name"
                defaultValue={serviceName}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
              <option value="Low">Low</option>
              <option value="Low">Low</option>
              <option value="Low">Low</option>
              <option value="Low">Low</option>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                ref={priceRef}
                placeholder="Price"
                defaultValue={price}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                ref={descriptionRef}
                placeholder="Description"
                defaultValue={description}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Contract ID
              </label>
              <input
                type="number"
                name="contractId"
                id="contractId"
                ref={contractIdRef}
                placeholder="Contract ID"
                defaultValue={contractId}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
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
                onClickFunction={handleSave}
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

export default AdminServiceDetails;
