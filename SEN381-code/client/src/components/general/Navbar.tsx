import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import Headings from "./Headings";

interface Headings {
  heads: string[];
  functions: (() => void)[];
}

function NewNav({ heads, functions }: Headings) {
  const [isOpen, setIsOpen] = useState(false);
  // const [message, setMessage] = useState('Initial Message');
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

  const closeAccountOverlay = () => {
    setShowAccountOverlay(false);
  };

  const dropdownStyle = {
    transform: `translateY(${isOpen ? 0 : "-124%"})`,
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <nav className="bg-white shadow dark:bg-white z-60 relative">
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
            <a href="login" className="my-2 mb-20 hover:border-b-2">
              Dropdown Item 1
            </a>
            <br></br>
            <a href="#" className="my-2 hover:border-b-2">
              Dropdown Item 2
            </a>
            <br></br>
            <a href="#" className="my-2 hover:border-b-2">
              Dropdown Item 3
            </a>
            <br></br>
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

      {/* Account Overlay */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 ${
          showAccountOverlay
            ? "translate-y-4/7 -translate-x-1/2"
            : "opacity-0 -translate-x-1/2"
        }`}
      >
        <div className="bg-white p-6 rounded-lg shadow-md z-50">
          <h1>Account Overlay</h1>

          <button onClick={closeAccountOverlay}>Close</button>
        </div>
      </div>
    </nav>
  );
}

export default NewNav;
