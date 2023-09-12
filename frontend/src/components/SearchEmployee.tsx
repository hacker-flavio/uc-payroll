// import React, { useState, useRef, useEffect } from "react";
// import employeeList from "./Empolyees";
// import "./styles/SearchEmployee.css";

// interface SearchEmployeeProps {
//   searchEmployee: (name: string) => void;
// }

// function SearchEmployee({ searchEmployee }: SearchEmployeeProps) {
//   const employeeNameRef = useRef<HTMLInputElement | null>(null);
//   const [tempEmployeeName, setTempEmployeeName] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState<string[]>([]);
//   // Function to filter employees based on the input value
//   const filterEmployees = (inputValue: string) => {
//     const filteredEmployees = employeeList.filter((name) =>
//       name.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     return filteredEmployees;
//   };

//   useEffect(() => {
//     const filteredEmployees = filterEmployees(tempEmployeeName);
//     setFilteredEmployees(filteredEmployees);
//   }, [tempEmployeeName]);

//   useEffect(() => {
//     console.log(filteredEmployees);
//   }, [filteredEmployees]);

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Employee Name"
//           ref={employeeNameRef}
//           value={tempEmployeeName}
//           onChange={(event) => {
//             setTempEmployeeName(event.target.value);
//           }}
//         />
//         <button
//           onClick={() => searchEmployee(employeeNameRef.current?.value ?? "")}
//         >
//           Search
//         </button>
//       </div>
//       {tempEmployeeName.length > 0 && (
//         <div className="searchBox">
//           {filteredEmployees.map((name) => (
//             <div key={name}>{name}</div>
//           ))}
//         </div>
//       )}

//       <h2>{tempEmployeeName} Salary</h2>
//     </div>
//   );
// }

// export default SearchEmployee;
import React, { useState, useRef, useEffect, useCallback } from "react";
import employeeList from "./Empolyees";
import "./styles/SearchEmployee.css";

interface SearchEmployeeProps {
  searchEmployee: (name: string) => void;
}

function SearchEmployee({ searchEmployee }: SearchEmployeeProps) {
  const employeeNameRef = useRef<HTMLInputElement | null>(null);
  const [tempEmployeeName, setTempEmployeeName] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [isHidden, setIsHidden] = useState(false);
  // Function to filter employees based on the input value
  const filterEmployees = (inputValue: string) => {
    const filteredEmployees = employeeList.filter((name) =>
      name.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filteredEmployees;
  };

  useEffect(() => {
    const filteredEmployees = filterEmployees(tempEmployeeName ?? "");
    setFilteredEmployees(filteredEmployees);
    setSelectedIndex(0); // Reset selected index when the input changes
  }, [tempEmployeeName]);

  // Change the type of event parameter from React.KeyboardEvent to KeyboardEvent
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Rest of the code remains the same
      if (e.key === "ArrowDown") {
        // ...
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex === filteredEmployees.length - 1
            ? 0
            : prevIndex + 1
        );
        console.log("ArrowDown");
      } else if (e.key === "ArrowUp") {
        // ...
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? filteredEmployees.length - 1
            : prevIndex - 1
        );
        console.log("ArrowUp");
      } else if (e.key === "Enter" && selectedIndex !== null) {
        // ...
        e.preventDefault();
        if (filteredEmployees.length > 0) {
          setTempEmployeeName(filteredEmployees[selectedIndex]);
          setSelectedIndex(null);
        }

        // setTempEmployeeName(filteredEmployees[selectedIndex]);
        // setSelectedIndex(null);
        setIsHidden(true);
        if (isHidden && filteredEmployees.length > 0) {
          searchEmployee(employeeNameRef.current?.value ?? "");
        } else if (isHidden && filteredEmployees.length === 0) {
          alert("No employee found");
        }
        console.log("Enter");
      } else {
        setIsHidden(false);
      }
      // setIsHidden(false);
    },
    [filteredEmployees, selectedIndex, isHidden, searchEmployee]
  );

  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    // Attach event listener for keydown
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Employee Name"
          ref={employeeNameRef}
          value={tempEmployeeName}
          onChange={(event) => {
            setTempEmployeeName(event.target.value);
          }}
        />
        <button
          onClick={() => searchEmployee(employeeNameRef.current?.value ?? "")}
        >
          Search
        </button>
      </div>
      {tempEmployeeName?.length > 0 &&
        !isHidden &&
        filteredEmployees.length > 0 && (
          <div className="searchBox">
            {filteredEmployees.map((name, index) => (
              <div
                key={name}
                className={index === selectedIndex ? "selected" : ""}
                onClick={() => {
                  setTempEmployeeName(name);
                  setSelectedIndex(null);
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}

      <h2>{tempEmployeeName} Salary</h2>
    </div>
  );
}

export default SearchEmployee;
