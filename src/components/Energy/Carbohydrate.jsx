/* create carbohydrate compoenent*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import Carbo from "./Carbohydrate.png";
import "./Calory.css";
import backgroundCarb from "./backgroundCarb.png";
function Carbohydrate () {
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

  const { carbohydrateCount } = user.keyData;

  return (
    <div className="Calory_Container Carb">
<div className="Calory_Button" style={{backgroundImage: `url(${backgroundCarb})`}}>    
        <img src={Carbo} alt="Carbohydrate icon" />
      </div>
      <div className="Calory_Number">
        <span className = "kcal">{carbohydrateCount} g</span>
        <br />
        <span className="calories">Glucides</span>
      </div>
    </div>
  );
}

export default Carbohydrate;