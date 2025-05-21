export function InputComponent({label, placeholder, onChange}){
  return <div>
    <div className = "text-sm font medium text-left py-2">{label}</div>
    <input className = "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" onChange = {onChange} placeholder = {placeholder}></input>
  </div>
}