import { useState } from "react";
import axios from "axios";

export function Subbar({triggerRefetch}) {
  const [showModal, setShowModal] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between px-4 mt-6">
        <div className="font-bold text-xl">Cards</div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-md font-medium text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div><br/>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-200 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Card</h2>

            <input
              type="text"
              placeholder="Business name"
              className="w-full border rounded px-3 py-2 mb-4"
              value={businessName}
              onChange = {(e)=>{
                setBusinessName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Designation"
              className="w-full border rounded px-3 py-2 mb-4"
              value={designation}
              onChange = {(e)=>{
                setDesignation(e.target.value)
              }}
            />
            <input
              type= "number"
              placeholder="Contact"
              className="w-full border rounded px-3 py-2 mb-4"
              value={contact}
              onChange = {(e)=>{
                setContact(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Website name"
              className="w-full border rounded px-3 py-2 mb-4"
              value={websiteName}
              onChange = {(e)=>{
                setWebsiteName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded px-3 py-2 mb-4"
              value={address}
              onChange = {(e)=>{
                setAddress(e.target.value)
              }}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setBusinessName("")
                  setDesignation("")
                  setContact("")
                  setWebsiteName("")
                  setAddress("")
                  setShowModal(false)
                }}
                className="px-4 py-2 text-white rounded bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={async() => {
                  try{
                    const token = localStorage.getItem("token");
                    const response = await axios.post("http://3.107.76.182:3000/api/v1/cards/add",{
                        bname: businessName,
                        designation,
                        contact,
                        webname: websiteName,
                        address
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    })
                  }
                  catch(err){
                    console.log("new card could not be added: ", err);
                    alert("Card could not be added")
                  }
                  finally{
                    setBusinessName("")
                    setDesignation("")
                    setContact("")
                    setWebsiteName("")
                    setAddress("")
                    setShowModal(false);
                    triggerRefetch();
                  }
                  
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
