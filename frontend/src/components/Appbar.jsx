import { Link } from "react-router-dom"

export function Appbar(){
  return <div className="shadow-lg h-14 flex justify-between">
    <div className="flex flex-col font-medium justify-center h-full ml-4">
        Business Cards 
    </div>
    <div className="flex">
      <div className="flex flex-col font-medium justify-center h-full mr-4">
        Welcome
      </div>
    <button className="rounded-full h-12 w-12 bg-slate-600 hover:bg-slate-800 mt-1 mr-2 text-slate-200 font-medium ">
        U
    </button>
    <div className="flex items-center px-3">
      <Link to = {"/"}><button className="text-white bg-red-700 font-medium rounded px-2 py-1 hover:bg-red-800">Log out</button></Link>
      </div>
    </div>
  </div>
}