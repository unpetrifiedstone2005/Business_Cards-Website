import { useState } from "react";
import axios from "axios";

export function Cards({ initialData, triggerRefetch }) {
  const [editField, setEditField] = useState(null);
  const [del, setDel] = useState(null);
  const [data, setData] = useState(initialData);
  const [prevValue, setPrevValue] = useState(null);

  const handleDoubleClick = (field) => {
    if (field !== "firstName" && field !== "lastName" && field !== "email") {
      setEditField(field);
      setPrevValue(data[field]); 
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [editField]: e.target.value });
  };

  const handleBlur = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:3000/api/v1/cards/update", { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      alert("Field not edited: " + err.message);
    } finally {
      setEditField(null);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl font-sans text-gray-800">
      <button
        onClick={async () => {setDel(true)}}
        className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
      >
        Delete
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-bold">
          {data.firstName || "[First Name]"} <span>{data.lastName || "[Last Name]"}</span>
        </h1>

        {editField === "designation" ? (
          <input
            className="border p-1 text-sm text-gray-600"
            value={data.designation}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            autoFocus
          />
        ) : (
          <p
            className="text-sm text-gray-600 cursor-pointer"
            onDoubleClick={() => handleDoubleClick("designation")}
          >
            {data.designation || "Your Designation"}
          </p>
        )}
        <hr className="mt-2 border-gray-300" />
      </div>

      <div className="flex mt-4">
        <div className="w-2/3 space-y-3 text-sm pr-4">
          {[
            { field: "contact", icon: "📞", placeholder: "Phone number" },
            { field: "webname", icon: "🌐", placeholder: "Website" },
            { field: "email", icon: "✉️", placeholder: "Email", editable: false },
            { field: "address", icon: "📍", placeholder: "Address" },
          ].map(({ field, icon, placeholder, editable = true }) => (
            <div key={field} className="flex items-center gap-2">
              <span className="text-blue-600">{icon}</span>
              {editable && editField === field ? (
                <input
                  className="border p-1 w-full"
                  value={data[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                  autoFocus
                />
              ) : (
                <span
                  className={editable ? "cursor-pointer" : ""}
                  onDoubleClick={() => editable && handleDoubleClick(field)}
                >
                  {data[field] || (
                    <span className="text-gray-400 italic">{placeholder}</span>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>

        

        <div className="flex-1 flex items-center justify-center">
          {editField === "bname" ? (
            <input
              className="border p-1 text-xl text-center font-bold w-full"
              value={data.bname}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              autoFocus
            />
          ) : (
            <div
              className="text-2xl font-bold cursor-pointer"
              onDoubleClick={() => handleDoubleClick("bname")}
            >
              {data.bname || "Your Business Name"}
            </div>
          )}
        </div>
      </div>

      {del && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg w-full max-w-xs">
                <h2 className="px-4 text-center">Are you sure you want to delete this card?</h2><br/>
                <div className="flex px-14 gap-14 justify-between items-center">
                  <button onClick={async()=>{
                    const token = localStorage.getItem("token");
                    try {
                      await axios.delete(`http://localhost:3000/api/v1/cards/delete/`+ initialData.id, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      triggerRefetch();
                    } catch (err) {
                      alert("Failed to delete");
                    }
                  }} className="px-4 py-2 rounded bg-red-400 hover:bg-red-500">Yes</button>
                  <button onClick = {()=>{
                      setDel(false);
                  }} className="px-4 py-2  rounded bg-green-400 hover:bg-green-500">No</button>
                </div>
                
          </div>
      </div>
    )}

    </div>
  );
}
