import React, { useState, useRef } from "react";

interface SearchEmployeeProps {
  setEmployeeName: (name: string) => void;
}

function SearchEmployee({ setEmployeeName }: SearchEmployeeProps) {
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
          onClick={() => setEmployeeName(employeeNameRef.current?.value || "")}
        >
          Search
        </button>
      </div>

      <h2>{tempEmployeeName} Salary</h2>
    </div>
  );
}

export default SearchEmployee;
