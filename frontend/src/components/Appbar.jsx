import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

export function Appbar({triggerRefetch}){
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  return <div className="shadow-lg h-14 flex justify-between">
    <div className="flex flex-col font-xl font-bold justify-center h-full ml-4">
        Business Cards 
    </div>
    <div className="flex">
      <div className="flex flex-col font-xl font-bold justify-center h-full mr-4">
        Welcome
      </div>
      <button onClick={()=>{
          setEditUser(true)
      }} className="rounded-full h-10 w-10 mt-2 flex items-center justify-center bg-slate-600 hover:bg-slate-800 mr-2 text-slate-200 font-medium">
        U
      </button>
    <div className="flex items-center px-3">
      <button onClick={()=>{
          setShowModal(true)
      }} className="text-white bg-red-700 text-base font-medium  rounded px-2 py-1 hover:bg-red-800">Log out</button>
      </div>
    </div>

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
                <h2 className="px-4">Are you sure you want to log out?</h2><br/>
                <div className="flex px-8 gap-8 justify-between items-center">
                  <button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/")
                  }} className="px-4 py-2 rounded bg-red-400 hover:bg-red-500">Yes</button>
                  <button onClick = {()=>{
                      setShowModal(false);
                  }} className="px-4 py-2 rounded bg-green-400 hover:bg-green-500">No</button>
                </div>
                
          </div>
      </div>
    )}

    {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-200 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit User Information</h2>

            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded px-3 py-2 mb-4"
              value={username}
              onChange = {(e)=>{
                setUsername(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Password"
              className="w-full border rounded px-3 py-2 mb-4"
              value={password}
              onChange = {(e)=>{
                setPassword(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 mb-4"
              value={email}
              onChange = {(e)=>{
                setEmail(e.target.value)
              }}
            />
            <input
              type= "text"
              placeholder="First name"
              className="w-full border rounded px-3 py-2 mb-4"
              value={firstName}
              onChange = {(e)=>{
                setFirstName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full border rounded px-3 py-2 mb-4"
              value={lastName}
              onChange = {(e)=>{
                setLastName(e.target.value)
              }}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>{
                  setEditUser(false)
                  setUsername("")
                  setPassword("")
                  setEmail("")
                  setFirstName("")
                  setLastName("")
                }}
                className="px-4 py-2 text-white rounded bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={async() => {
                  try{
                    const token = localStorage.getItem("token");
                    const payload = {};
                    if (username.trim() !== "") payload.username = username;
                    if (password.trim() !== "") payload.password = password;
                    if (email.trim() !== "") payload.email = email;
                    if (firstName.trim() !== "") payload.firstName = firstName;
                    if (lastName.trim() !== "") payload.lastName = lastName;
                    const response = await axios.put("http://localhost:3000/api/v1/user/update",payload,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    })

                    const response2 = await axios.put("http://3.107.76.182:3000/api/v1/cards/update", {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        email: payload.email
                    },{
                       headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    })

                  }
                  catch(err){
                    console.log("User could not be updated: ", err);
                    alert("User could not be updated")
                  }
                  finally{
                    setUsername("")
                    setPassword("")
                    setFirstName("")
                    setEmail("")
                    setLastName("")
                    setEditUser(false);
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
}
