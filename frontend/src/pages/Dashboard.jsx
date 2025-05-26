import { Subbar } from "../components/Subbar";
import { Cards } from "../components/Cards";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/cards/get", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCards([...response.data.arr]); 
    } catch (err) {
      console.error("Failed to fetch cards", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [refetchTrigger]); 

  const triggerRefetch = () => {
    setRefetchTrigger(prev => !prev); 
  };

  return (
    <div className="min-h-screen bg-cover bg-slate-300">
      <Appbar triggerRefetch={triggerRefetch} />
      <Subbar triggerRefetch={triggerRefetch} />
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Cards 
            key={card._id + JSON.stringify(card)} 
            initialData={{
              bname: card.bname,
              designation: card.designation,
              firstName: card.firstName,
              email: card.email,
              lastName: card.lastName,
              contact: card.contact,
              webname: card.webname,
              address: card.address,
              id: card._id
            }}
            triggerRefetch={triggerRefetch}
          />
        ))}
      </div>
    </div>
  );
};
