import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserActivity } from "../../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend, CartesianGrid } from "recharts";
import "./DailyActivityChart.css";

/**
 * CustomTooltip component displays a custom tooltip for the chart.
 * @param {Object} props - Props for the component.
 * @param {boolean} props.active - Whether the tooltip is active.
 * @param {Array} props.payload - The payload of the tooltip.
 * @returns {JSX.Element|null} - The custom tooltip JSX element or null if not active.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weight = payload.find((item) => item.name === "Poids (Kg)");
    const calories = payload.find((item) => item.name === "Calories brûlées (kcal)");

    return (
      <div className="daily-custom-tooltip" style={{ borderColor: "red!important" }}>
        <span className="tooltip-value">{weight.value} kg</span>
        <span className="tooltip-value">{calories.value} kcal</span>
      </div>
    );
  }
  return null;
};

/**
 * CustomLegendIcon component displays a custom legend icon for the chart.
 * @param {Object} props - Props for the component.
 * @param {number} props.x - The x coordinate of the icon.
 * @param {number} props.y - The y coordinate of the icon.
 * @param {number} props.width - The width of the icon.
 * @param {number} props.height - The height of the icon.
 * @param {number} props.size - The size of the icon.
 * @param {string} props.fill - The fill color of the icon.
 * @returns {JSX.Element} - The custom legend icon JSX element.
 */
function CustomLegendIcon(props) {
  const { x, y, width, height, size, fill } = props;
  return (
    <svg width={width} height={height} x={x} y={y}>
      <g className="legend-icon">
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill={fill} />
      </g>
    </svg>
  );
}

/**
 * DailyActivityChart component displays a bar chart showing daily activity for a user.
 * @returns {JSX.Element} .The daily activity chart JSX element.
 */
function DailyActivityChart() {
  // Extract userId from the URL using useParams
  const { userId } = useParams();
  // Initialize state variables for user activity and error status
  const [userActivity, setUserActivity] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user activity data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user activity data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user activity data from the data manager
        const chartData = await getUserActivity(userId);
        // Update the userActivity state with the fetched data
        setUserActivity(chartData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    // Call fetchData to fetch user activity data
    fetchData();
  }, [userId]);
  // If there was an error while fetching data, display an error message
  if (error) {
    return <div>Error: Failed to load user data for activity chart.</div>;
  }
  // If user activity data is not yet loaded, display a loading message
  if (!userActivity) {
    return <div>Loading...</div>;
  }
  // Format the label for X axis of the chart
  const formatLabel = (value, index) => {
    if (!userActivity || userActivity.length === 0) {
      return "";
    }
    return index + 1;
  };
  // Return the chart
  return (
    <div className="Daily">
      <BarChart
        width={835}
        height={320}
        data={userActivity}
      >
        <CartesianGrid className="DailyGrid" vertical={false} strokeDasharray="2 2" stroke="grey" />
        <Bar
          className="custom-bar"
          dataKey="kilograms"
          fill="#E6000"
          barSize={7}
          name="Poids (Kg)"
          radius={[3, 3, 0, 0]}
          yAxisId="KilogramsLeft"
          active={{ fill: 'blue' }}
        />
        <Bar
          dataKey="calories"
          barSize={7}
          name="Calories brûlées (kcal)"
          radius={[3, 3, 0, 0]}
          legendIcon={<CustomLegendIcon />}
          yAxisId="CaloriesRight"
        />
        <text className="Activite" x={90} y={40} textAnchor="middle" fontWeight={600} fontSize={15}>
          Activité quotidienne
        </text>
        <XAxis dataKey="day"
          tickCount={10}
          tickFormatter={formatLabel}
          tickLine={false}
          className="DailyXAxis"
        />
        <YAxis
          orientation="right"
          dataKey="kilograms"
          domain={["dataMin - 1", "dataMax + 2"]}
          ticks={[60, 70, 80]}
          tickFormatter={(value) => `${value} `}
          yAxisId="KilogramsLeft"
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "#999",
            strokeWidth: 0.1
          }}
        />

        <YAxis
          orientation="right"
          dataKey="calories"
          tickCount={10}
          tickFormatter={(value) => `${value} `}
          domain={[0, "dataMax + 50"]}
          hide={true}
          yAxisId="CaloriesRight"
        />

        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip />}
        />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          label={{ fontSize: 24, fontWeight: 500 }}
          wrapperStyle={{ color: "black", top: 0 }}
          payload={[
            {
              value: "Poids (Kg)",
              type: "circle",
              color: "#000000",
            },
            {
              value: "Calories brûlées (kcal)",
              type: "circle",
              color: "#E60000",
            },
          ]}
        />
      </BarChart>
    </div>
  );
}
// Define PropTypes for the component
DailyActivityChart.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DailyActivityChart;