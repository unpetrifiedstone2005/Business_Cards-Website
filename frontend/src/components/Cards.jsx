export function Cards({bname, designation, firstName, lastName, contact, webname, address}){
    return  (<div className="bg-slate-100 rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <>
                <div>{bname}</div>
                <div>{designation}</div>
                <div>{firstName}</div>
                <div>{lastName}</div>
                <div>{contact}</div>
                <div>{webname}</div>
                <div>{address}</div>
                </><br/>
              </div>)
}