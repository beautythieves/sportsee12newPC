import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../../dataManager/dataManager";
import { PieChart, Pie, Cell, Label } from "recharts";

/**
 * UserPieChart component displays a pie chart of a user's score.
 * @returns {JSX.Element}
 */
function UserPieChart() {
  // Extract userId from the URL using useParams
  const { userId } = useParams();

  // Initialize state variables for user data and error
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user data from the data manager
        const userData = await getUserMainData(userId);

        // Update the user state with the fetched data
        setUser(userData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchData();
  }, [userId]);

  // Display an error message if the data failed to load
  if (error) {
    return <div>Error: Failed to load user data for pie chart.</div>;
  }

  // Display a loading message if user data is not yet loaded
  if (!user) {
    return <div>Loading...</div>;
  }

  // Get today's score from the user data
  const { todayScore } = user;

  // Define the data for the pie chart
  const data = [
    { name: "Score", value: todayScore },
    { name: "Reste", value: 1 - todayScore },
  ];

  // Define the colors for the pie chart slices
  const COLORS = ["#FF0000", "#FFFFFF"];

  // Render the pie chart with the user score data
  return (
    <div className="Pie" style={{ width: "100%", height: 300, background: "#FBFBFB" }}>      <PieChart width={300} height={300}>
        {/* Add a label for the chart */}
        <text
          x={50}
          y={50}
          fill="#8884d8"
          style={{ fontSize: 15, fontWeight: "bold" }}
        >
          Score
        </text>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {/* Add slices for the chart */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Add a label for the chart */}
          <Label
            value={`${Math.round(todayScore * 100)}%\n de votre\n objectif`}
            position="center"
            fill="#282D30"
            fontSize={20}
            fontWeight="bold"
            lineHeight={1.2}
            textAnchor="middle"
          />
        </Pie>
      </PieChart>
    </div>
  );
}

export default UserPieChart;