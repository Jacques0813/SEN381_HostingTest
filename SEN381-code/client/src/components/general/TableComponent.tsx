import { useEffect, useState } from "react";
import Menu from "./Menu";

interface TableValues {
  // Table data.
  jsonData: any[];
  // What happens whenever a row is clicked.
  onClickFunction: (rowData: any) => void;
  // Options and click functions for those options in our menu when right clicking a row.
  menuOptions: string[];
  menuOptionsClick: any[];
}

function TableComponent({
  jsonData,
  onClickFunction,
  menuOptions,
  menuOptionsClick,
}: TableValues) {
  const headings = Object.keys(jsonData[0] || {});
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState(jsonData);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  let i = 0;

  // Setting the direction of which column is being sorted.
  function handleSort(key: string) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    // Sorting algorithm
    const sortedData = [...jsonData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setRowData(sortedData);
  }

  // Set our right click menu to display next to our crusor.
  function handleRightClick(e: any) {
    e.preventDefault(); // Prevent the default context menu.
    setMenuPosition({ top: e.clientY, left: e.clientX });
    setMenuVisible(true);
  }

  // Sometimes the system gives an issue where it does not set the initial devclartion of rowData so we set a hook to make sure it gets that data.
  useEffect(() => {
    setRowData(jsonData);
  }, [jsonData]);

  return (
    <div className="overflow-scroll max-h-[75vh] mx-[2vw]">
      <table className="min-w-full">
        <thead className="bg-blue-300 border-b sticky top-0">
          <tr>
            {/* Dynamically loading headings. */}
            {headings.map((head) => (
              <th
                key={head}
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                {/* Create a clickable element on each heading so it can be sorted. */}
                <button
                  onClick={() => handleSort(head)}
                  style={{ cursor: "pointer" }}
                >
                  {head}
                  {/* Adding indications that it is sorted. */}
                  {sortConfig.key === head &&
                    (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((data) => (
            <tr
              key={i++}
              onClick={() => {
                setSelectedRow(data);
                onClickFunction(data);
                setMenuVisible(false);
              }}
              onContextMenu={(e) => {
                e.preventDefault(); // Prevent the default context menu from appearing
                setSelectedRow(data);
                onClickFunction(data);
                handleRightClick(e);
              }}
              className={`${
                selectedRow === data
                  ? "bg-gray-600 transition duration-300 ease-in-ou"
                  : "bg-white transition duration-300 ease-in-out hover:bg-gray-100"
              } border-b `}
            >
              {headings.map((head) => (
                <td
                  key={head}
                  className={`${
                    selectedRow === data ? "text-white" : "text-gray-900"
                  } px-6 py-4 whitespace-nowrap text-sm font-medium`}
                >
                  {/* We have to check if the data type is boolean, because we can't render booleans. So we render them as strings. */}
                  {typeof data[head] === "boolean"
                    ? data[head]
                      ? "true"
                      : "false"
                    : head == "Password"
                    ? "**********"
                    : data[head]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Menu that gets displayed when right clicking. */}
      {menuVisible && (
        <Menu
          options={menuOptions}
          onClicks={menuOptionsClick}
          top={menuPosition.top}
          left={menuPosition.left}
          onSelected={(visible) => {
            setMenuVisible(visible);
          }}
        />
      )}
    </div>
  );
}

export default TableComponent;
