import { Searchbar } from "../components/Searchbar"
import { Cards } from "../components/Cards"
import { Appbar } from "../components/Appbar"

export const Dashboard = () => {
  return <div className="min-h-screen bg-cover bg-slate-300">
    <Appbar />
    <Searchbar />
    <div className="w-full px-4 grid grid-cols-4 gap-4">
      <Cards
  initialData={{
    bname: "fhjksnfa",
    designation: "sjdk",
    firstName: "djf",
    lastName: "fdsfsd",
    contact: "knfds",
    webname: "nds",
    address: "fjds"
  }}
/>
      <Cards
  initialData={{
    bname: "fhjksnfa",
    designation: "sjdk",
    firstName: "djf",
    lastName: "fdsfsd",
    contact: "knfds",
    webname: "nds",
    address: "fjds"
  }}
/><Cards
  initialData={{
    bname: "fhjksnfa",
    designation: "sjdk",
    firstName: "djf",
    lastName: "fdsfsd",
    contact: "knfds",
    webname: "nds",
    address: "fjds"
  }}
/><Cards
  initialData={{
    bname: "fhjksnfa",
    designation: "sjdk",
    firstName: "djf",
    lastName: "fdsfsd",
    contact: "knfds",
    webname: "nds",
    address: "fjds"
  }}
/>
    </div>
    </div>
}