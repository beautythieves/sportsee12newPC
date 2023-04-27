import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import "./UserPage.css";
import UserGreeting from "../UserGreeting/UserGreeting";
import UserPieChart from "../Charts/ScoreChart/ScoreChart";
import CalorieCount from "../Energy/Calory";
import Proteins from "../Energy/Protein";
import Carbohydrate from "../Energy/Carbohydrate";
import Fat from "../Energy/Fat";
import PerformanceChart from "../Charts/PerformanceChart/PerformanceChart";
import DailyActivityChart from "../Charts/DailyActivityChart/DailyActivityChart";
import SessionLengthChart from "../Charts/SessionLengthChart/SessionLengthChart";

/**
 * UserPage component displays a user's dashboard, including greeting, charts, and nutritional information.
 * @returns {JSX.Element}
 */
function UserPage() {
  // Extract userId from the URL using useParams
  const { userId } = useParams();

  // Initialize state variables for user data and error status
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user main data from the data manager
        const data = await getUserMainData(userId);

        // Update the userData state with the fetched data
        setUserData(data);
      } catch (err) {
        // If there's an error fetching data, set the error state to true
        console.log(err);
        setError(true);
      }
    }

    // Call fetchData to fetch user data
    fetchData();
  }, [userId]);

  // If there's an error, display an error message
  if (error) {
    return <div>Error: Failed to load user data.</div>;
  }

  // If user data is not yet loaded, display a loading message
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Render the user's dashboard components
  return (
    <div className="UserContainer">
      <div className="Charts">
        <UserGreeting userId={userId} />
        <DailyActivityChart userId={userId} />
        <div className="ChartsInRow">
          <SessionLengthChart userId={userId} />
          <PerformanceChart userId={userId} />
        <UserPieChart userId={userId} />
        </div>
      </div>
      <div className="Energy">
        <CalorieCount />
        <Proteins />
        <Carbohydrate />
        <Fat />
      </div>
    </div>
  );
}

export default UserPage;
