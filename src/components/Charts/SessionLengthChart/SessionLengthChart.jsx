import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserAverageSessions } from "../../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import {  LineChart,  XAxis,  YAxis,  Tooltip,  Line,  CartesianGrid,} from "recharts";
import "./SessionLengthChart.css";
/**
 * CustomTooltip for the LineChart. Displays the session length when hovered.
 * @param {object} props - The props passed to the component.
 * @param {boolean} props.active - Whether the tooltip should be active.
 * @param {Array} props.payload - The payload data for the tooltip.
 * @returns {JSX.Element|null}
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const sessionLength = payload[0].value;
    return (
      <div className="session-custom-tooltip" style={{ borderColor: "black", backgroundColor: "white", padding: "5px", border: "red!important" }}>
        <span className="session-tooltip-value">{sessionLength} min</span>
      </div>
    );
  }
  return null;
};

/**
 * SessionLengthChart component displays a line chart of a user's average session length per day.
 * @returns {JSX.Element}
 */
function SessionLengthChart() {
  // Define PropTypes for the component
  SessionLengthChart.propTypes = {
    userId: PropTypes.string.isRequired,
  };

  // Extract userId from the URL using useParams
  const { userId } = useParams();

  // Initialize state variables for user sessions and error
  const [userSessions, setUserSessions] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user average session data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user average session data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user average session data from the data manager
        const userData = await getUserAverageSessions(userId);

        // Update the userSessions state with the fetched data
        const updatedData = userData[1].map((dayData) => {
          const sessionLengthStr = dayData.sessionLength.toString();
          const sessionLengthNum = Number(sessionLengthStr.match(/\d+/)[0]);
          const daysOfWeek = ["", "L", "M", "M", "J", "V", "S", "D"];
          const day = daysOfWeek[dayData.day];
          return {
            ...dayData,
            day: day,
            sessionLength: sessionLengthNum,
          };
        });
        setUserSessions(updatedData);
      } catch (err) {
        console.log("Error fetching user data:", err);
        setError(true);
      }
    }
    fetchData();
  }, [userId]);

  // Display an error message if the data failed to load
  if (error) {
    return (
      <div>Error: Failed to load user data for session length chart.</div>
    );
  }

  // Display a loading message if user session data is not yet loaded
  if (!userSessions) {
    return <div>Loading...</div>;
  }

  // Render the line chart with the user session data
  return (
    <div className="Session">
      <h3 className="sessionTitle">Durée moyenne des <br></br>sessions</h3>
      <LineChart
        width={268}
        height={263}
        data={userSessions}
        cursor={{ stroke: "red, strokeWidth: 2" }}
        margin={{ top: 20, right: 10, left: 10, bottom: 30 }}
      >
        <XAxis
          dataKey="day"
          tick={{ stroke: "white", strokeWidth: 0.4, fontSize: 12 }}
          style={{ textAnchor: "middle", transform: "translateY(-0px) " }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="number"
          domain={[0, "dataMax"]}
          tickCount={5}
          width={0}
          stroke="transparent"
          axisline={false}
        />
        <Tooltip content={<CustomTooltip />} isAnimationActive={false} wrapperStyle={{ outline: "none" }} />

        <CartesianGrid stroke="#f5f5f5" vertical={false} />
        <CartesianGrid stroke="#f5f5f5" horizontal={false} />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 4, stroke: "white" }}
        />
      </LineChart>
    </div>
  );
}
/*propTypes for the component*/
SessionLengthChart.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default SessionLengthChart;


