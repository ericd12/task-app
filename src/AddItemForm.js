import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const AddItemForm = ({ setColumns, columns }) => {
  const [value, setValue] = useState("");
  const columnIds = Object.keys(columns);

  return (
    <div>
      <input
        onChange={({ target }) => setValue(target.value)}
        placeholder="Task Item"
        value={value}
      />
      <button
        onClick={() => {
          setColumns(prev => {
            const nC = { ...prev };
            // get first book id
            const [firstColumn] = columnIds;
            const c = { ...prev[firstColumn] };
            // console.log({ c });
            const ci = [...c.items];
            ci.push({ _id: uuid(), elementlabel: value });
            c.items = ci;
            nC[firstColumn] = c;
            return nC;
          });
        }}
        type="button"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddItemForm;
