import { CSSProperties, useState } from "react";

interface props {
  top: number;
  left: number;
  options: string[];
  onClicks: any[];
  onSelected: (clicked: boolean) => void;
}

function Menu({ options, onClicks, top, left, onSelected }: props) {
  const style: CSSProperties = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`,
  };

  if (options.length <= 0) {
    return null;
  }
  return (
    <div className={`max-w-lg mx-auto`} style={style}>
      <div className="bg-white rounded-lg border border-gray-200 w-48 text-gray-900 text-sm font-medium">
        {options.map((option, index) => (
          <a
            href="#"
            className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
            onClick={() => {
              onClicks[index]();
              onSelected(false);
            }}
            key={option}
          >
            {option}
          </a>
        ))}
      </div>
    </div>

    // <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
  );
}

export default Menu;
