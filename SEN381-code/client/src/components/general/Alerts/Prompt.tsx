import { useEffect, useState } from "react";

interface props {
  type: string;
  title: string;
  body: string;
  closed: (closed: boolean) => void;
  shouldDelete: (should: boolean) => void;
}

function Prompt({ type, title, body, closed, shouldDelete }: props) {
  const [showAlert, setShowAlert] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);
  let bgcolor;
  let textcolor;
  let bordercolor;

  switch (type) {
    case "warning": {
      bgcolor = "bg-yellow-100";
      textcolor = "text-yellow-700";
      bordercolor = "border-yellow-700";
      break;
    }
    case "info": {
      bgcolor = "bg-blue-100";
      textcolor = "text-blue-700";
      bordercolor = "border-blue-700";
      break;
    }
    case "error": {
      bgcolor = "bg-red-100";
      textcolor = "text-red-700";
      bordercolor = "border-red-700";
      break;
    }
    case "success": {
      bgcolor = "bg-green-100";
      textcolor = "text-green-700";
      bordercolor = "border-green-700";
      break;
    }
  }

  const closeAlert = () => {
    // Removed setEndAnimation(true) from closeAlert
    setShowAlert(false);

    const delay = 1000;
    const timer = setTimeout(() => {
      closed(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    const displayTime = 500; // 1 second (in milliseconds)

    const showTimer = setTimeout(() => {
      setShowAlert(true);
    }, displayTime);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  return !endAnimation ? (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed -top-[6vh] left-0 right-0 flex justify-center items-center max-w-lg mx-auto">
        <form>
          <div
            className={`flex ${bgcolor} rounded-lg p-4 mb-4 text-sm ${textcolor} border ${bordercolor} transform transition-transform duration-500
        ${showAlert ? "translate-y-[8vh]" : "-translate-y-[8vh]"}
          `}
            role="alert"
          >
            <svg
              className="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <div>
                <span className="font-medium inline-block">{title}</span> {body}
              </div>
              <div>
                <button
                  onClick={async (event) => {
                    await event.preventDefault();
                    closeAlert();
                    const delay = 500;
                    const timer = setTimeout(() => {
                      closed(true);
                      shouldDelete(true);
                    }, delay);

                    return () => clearTimeout(timer);
                  }}
                  className={`ml-2 ${textcolor} font-bold hover:underline cursor-pointer mr-8`}
                >
                  Yes
                </button>
                <button
                  onClick={async (event) => {
                    await event.preventDefault();
                    closeAlert();
                    const delay = 500;
                    const timer = setTimeout(() => {
                      closed(true);
                      shouldDelete(false);
                    }, delay);

                    return () => clearTimeout(timer);
                  }}
                  className={`ml-2 ${textcolor} font-bold hover:underline cursor-pointer`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Prompt;
