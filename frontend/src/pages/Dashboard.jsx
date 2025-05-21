import { Searchbar } from "../components/Searchbar"
import { Cards } from "../components/Cards"
import { Appbar } from "../components/Appbar"

export const Dashboard = () => {
  return <div>
    <Appbar />
    <Searchbar />
    <div className="w-full px-4 grid grid-cols-4 gap-4">
      <Cards bname={"fhjksnfa"} designation={"sjdk"} address={"fjds"} firstName={"djf"} lastName={"fdsfsd"}  webname={"nds"} contact={"knfds"}/>
      <Cards bname={"fhjksnfa"} designation={"sjdk"} address={"fjds"} firstName={"djf"} lastName={"fdsfsd"}  webname={"nds"} contact={"knfds"}/>
      <Cards bname={"fhjksnfa"} designation={"sjdk"} address={"fjds"} firstName={"djf"} lastName={"fdsfsd"}  webname={"nds"} contact={"knfds"}/>
      <Cards bname={"fhjksnfa"} designation={"sjdk"} address={"fjds"} firstName={"djf"} lastName={"fdsfsd"}  webname={"nds"} contact={"knfds"}/>
    </div>
    </div>
}