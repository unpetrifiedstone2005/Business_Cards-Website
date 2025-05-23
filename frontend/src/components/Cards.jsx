import { useState } from "react";
import axios from "axios";

export function Cards({ initialData }) {
  const [editField, setEditField] = useState(null);
  const [data, setData] = useState(initialData);

  const handleDoubleClick = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setData({ ...data, [editField]: e.target.value });
  };

  const handleBlur = async () => {
    try {
      await axios.put("http://localhost:3000/api/v1/cards/update", { ...data });
    } catch (err) {
      console.log("Field could not be edited");
      alert("Field not edited: " + err.message);
    } finally {
      setEditField(null);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md font-sans text-gray-800">
      {/* Delete Button */}
      <button className="absolute top-4 right-4 bg-red-400 text-white px-2 py-1 text-sm rounded hover:bg-red-600">
        Delete
      </button>

      {/* Name and Title */}
      <div className="mb-6">
        {editField === "firstName" || editField === "lastName" ? (
          <div className="flex gap-2 mb-1">
            {editField === "firstName" && (
              <input
                className="border p-1 text-lg font-bold"
                value={data.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                autoFocus
              />
            )}
            {editField === "lastName" && (
              <input
                className="border p-1 text-lg font-bold"
                value={data.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                autoFocus
              />
            )}
          </div>
        ) : (
          <h1
            className="text-2xl font-bold cursor-pointer"
            onDoubleClick={() => setEditField("firstName")}
          >
            {data.firstName || "[First Name]"}{" "}
            <span
              onDoubleClick={() => setEditField("lastName")}
              className="cursor-pointer"
            >
              {data.lastName || "[Last Name]"}
            </span>
          </h1>
        )}

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

      {/* Contact Details */}
      <div className="space-y-3 text-sm">
        {[
          { field: "contact", icon: "📞", placeholder: "Phone number" },
          { field: "webname", icon: "🌐", placeholder: "Website" },
          { field: "bname", icon: "✉️", placeholder: "Email" },
          { field: "address", icon: "📍", placeholder: "Address" },
        ].map(({ field, icon, placeholder }) => (
          <div key={field} className="flex items-center gap-2">
            <span className="text-blue-600">{icon}</span>
            {editField === field ? (
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
                className="cursor-pointer"
                onDoubleClick={() => handleDoubleClick(field)}
              >
                {data[field] || (
                  <span className="text-gray-400 italic">{placeholder}</span>
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
