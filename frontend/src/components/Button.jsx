export function Button({label, onChange}){
    return <div>
      <button className = "w-full mt-6 py-3 px-4 text-slate-100 text-xl font-medium bg-purple-500 rounded-full" onChange = {onChange}>{label}</button>
    </div>
}