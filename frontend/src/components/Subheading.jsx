import { Link } from "react-router-dom"

export function Subheading({label, buttonText, to}){
  return <div className="py-2 text-sm flex justify-left">
    <div className = "pb-3 pt-1 text-sm text-left font-semilight">{label}</div>
    <Link className = "pointer font-medium pl-1 pb-3 pt-1 cursor-pointer hover:underline" to ={to}>
    {buttonText}
    </Link>
  </div>
}