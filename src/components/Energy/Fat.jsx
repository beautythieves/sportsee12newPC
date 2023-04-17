import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import cheeseburger from "./cheeseburger.svg";
import "./Calory.css";
import backgroundFat from "./backgroundFat.png";
function Fat () {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserMainData(userId);
        setUser(userData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }

    fetchData();
  }, [userId]);

  if (error) {
    return <div>Error: Failed to load user data carbohydrates.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { lipidCount } = user.keyData;

  return (
    <div className="Calory_Container Fat">
<div className="Calory_Button" style={{backgroundImage: `url(${backgroundFat})`}}>     
        <img src={cheeseburger} alt="Carbohydrate icon" />
      </div>
      <div className="Calory_Number">
       <span className="kcal">{lipidCount} g</span> 
        <br />
        <span className="calories">Lipides</span>
      </div>
    </div>
  );
}

export default Fat;