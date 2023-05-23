import React, { useState, useEffect } from "react";
import { getUserMainData } from "../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import Calory from "./Calory.png";
import "./Calory.css";
import backgroundCalory from "./backgroundCalory.png";
/** 
 * UserCalories component displays the user's calorie count.
 * @returns {JSX.Element} the rendered component
 */
function UserCalories() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserMainData(userId);
        setUser(userData);
      } catch (err) {
        console.log("Error fetching user data for UserCalories:", err);
        setError(true);
      }
    }
    fetchData();
  }, [userId]);
  if (error) {
    return <div>Error: Failed to load user data calory.</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  const { calorieCount } = user.keyData;
  const kcalCount = (calorieCount / 1000).toLocaleString();
  return (
    <div className="Calory_Container" style={{ paddingLeft: "27px" }}>
      <div className="Calory_Button" style={{ backgroundImage: `url(${backgroundCalory})` }}>
        <img src={Calory} alt="Calorie icon" />
      </div>
      <div className="Calory_Number">
        <span className="kcal">{kcalCount}kCal</span>
        <br />
        <span className="calories">Calories</span>
      </div>
    </div>
  );
}

export default UserCalories;
