import React, { useState, useRef } from "react";

interface SearchEmployeeProps {
  searchEmployee: (name: string) => void;
}

function SearchEmployee({ searchEmployee }: SearchEmployeeProps) {
  const employeeNameRef = useRef<HTMLInputElement | null>(null);
  const [tempEmployeeName, setTempEmployeeName] = useState("");

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

      <h2>{tempEmployeeName} Salary</h2>
    </div>
  );
}

export default SearchEmployee;
