import { useState } from "react";
import { Button } from "./Button";

export function Searchbar(){
    return <div> 
      <div className="flex items-center justify-between px-4 mt-6">
    <div className="font-bold text-lg">Cards</div>
    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
      ADD
    </button>
  </div>
      <div className="my-2 px-5 gap-4">
        <input type = "text" placeholder = "Search cards.." className="w-full px-2 py-1 border bg-slate-200 rounded border-purple-200"/>
      </div>
    </div>
}