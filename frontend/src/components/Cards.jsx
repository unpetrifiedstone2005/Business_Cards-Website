import { useState } from "react";

export function Cards({ initialData }) {
  const [editField, setEditField] = useState(null);
  const [data, setData] = useState(initialData);

  const handleDoubleClick = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setData({ ...data, [editField]: e.target.value });
  };

  const handleBlur = () => {
    setEditField(null);
  };

  return (
    <div className="relative bg-slate-100 rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <button className="absolute top-4 right-4 bg-red-400 text-white px-1 py-0 rounded hover:bg-red-600">
        Delete
      </button>

      {["bname", "designation", "firstName", "lastName", "contact", "webname", "address"].map((field) => (
        <div key={field} onDoubleClick={() => handleDoubleClick(field)} className="mb-1">
          {editField === field ? (
            <input
              className="border p-1 text-sm w-3/4"
              value={data[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  e.target.blur();
                }
              }}
              autoFocus
            />
          ) : (
            data[field] || <span className="text-gray-400 italic">[empty]</span>
          )}
        </div>
      ))}
    </div>
  );
}