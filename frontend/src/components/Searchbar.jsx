import { useState } from "react";
import { Button } from "./Button";

export function Searchbar(){
    return <div>
      <div className="font-bold mt-6 text-lg">
        Cards
      </div>
      <div className="my-2">
        <input type = "text" placeholder = "Search cards.." className="w-full px-2 py-1 border rounded border-purple-200"/>
      </div>
    </div>
}