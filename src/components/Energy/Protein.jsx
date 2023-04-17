import React, { useState, useEffect } from "react";
import { getUserMainData } from "../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import Protein from "./Protein.png";
import "./Calory.css";
import backgroundProt from "./backgroundProt.png";

function Proteins() {
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
    return <div>Error: Failed to load user data proteins.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { proteinCount } = user.keyData;

  return (
    <div className="Calory_Container Prot">
      <div className="Calory_Button" style= {{backgroundImage:`url(${backgroundProt})` }}>
        <img src={Protein} alt="Protein icon" />
      </div>
      <div className="Calory_Number">
        <span className="kcal">{proteinCount} g</span>
        <br />
<span className="calories">Protéines</span>
      </div>
    </div>
  );
}

export default Proteins;
