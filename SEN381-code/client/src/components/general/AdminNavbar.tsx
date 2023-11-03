import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import Headings from "./Headings";
import ServiceDAccount from "../Desktop/EmpAccount";

interface Headings {
  heads: string[];
  functions: (() => void)[];
  id: number;
}

function NewNav({ heads, functions, id }: Headings) {
  const [isOpen, setIsOpen] = useState(false);
  // const [message, setMessage] = useState("Initial Message");
  const [showAccountOverlay, setShowAccountOverlay] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const toggleOptions = (val: string) => {
  //   setMessage(val);
  //   setIsOpen(false); // Close the menu when an option is selected
  // };

  const openAccountOverlay = () => {
    setShowAccountOverlay(true);
  };

  // const closeAccountOverlay = () => {
  //   setShowAccountOverlay(false);
  // };

  const dropdownStyle = {
    transform: `translateY(${isOpen ? 0 : "-124%"})`,
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <nav className="bg-white shadow dark:bg-white z-99 relative">
      <div className="flex items-center justify-between p-6 text-gray-600 capitalize dark:text-black h-24">
        <div className="flex items-center">
          <a href="#">
            <div
              className="group flex h-15 w-15 cursor-pointer items-center justify-center rounded-3xl bg-white p-2"
              onClick={toggleMenu}
            >
              <div className="space-y-2">
                <span
                  className={`block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out ${
                    isOpen ? "transform translate-y-1.5 rotate-45" : ""
                  }`}
                ></span>
                <span
                  className={`block h-1 w-10 origin-center rounded-full bg-blue-600 transition-transform ease-in-out ${
                    isOpen ? "transform -translate-y-1.5 -rotate-45" : ""
                  }`}
                ></span>
              </div>
            </div>
          </a>
        </div>

        {/* Dropdown Overlay */}
        <div
          className="fixed top-24 left-0 w-20% h-full bg-gray-500 opacity-95 z-50 blur=50px"
          style={dropdownStyle}
        >
          <div className="p-6">
            <a href="/" className="my-2 mb-20 hover:border-b-2">
              <button
                onClick={() => {
                  localStorage.setItem("authToken", "None");
                  window.location.href = "/";
                }}
              >
                Sign Out
              </button>
            </a>
          </div>
        </div>

        <div className="flex items-center">
          {/* Menu Items here. USE FOR LOOP */}
          <Headings heads={heads} onClickFunctions={functions} />
          {/* <a href="#" className={`mx-1.5 sm:mx-6 hover:border-blue-500 hover:border-b-2 ${message === 'home' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => toggleOptions('home')}>home</a>
          <a href="#" className={`mx-1.5 sm:mx-6 hover:border-blue-500 hover.border-b-2 ${message === 'features' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => toggleOptions('features')}>features</a>
          <a href="#" className={`mx-1.5 sm:mx-6 hover:border-blue-500 hover.border-b-2 ${message === 'pricing' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => toggleOptions('pricing')}>pricing</a> */}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700"
            onClick={openAccountOverlay}
          >
            <MdOutlineAccountCircle size={48} />
          </a>
        </div>
      </div>

      {showAccountOverlay ? (
        <ServiceDAccount
          id={id}
          onCancel={() => {
            setShowAccountOverlay(false);
          }}
          onSave={() => {
            setShowAccountOverlay(false);
          }}
        />
      ) : null}
    </nav>
  );
}

export default NewNav;
