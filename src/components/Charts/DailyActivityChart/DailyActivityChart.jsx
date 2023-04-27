import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserActivity } from "../../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend, CartesianGrid } from "recharts";
import "./DailyActivityChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weight = payload.find((item) => item.name === "Poids (Kg)");
    const calories = payload.find((item) => item.name === "Calories brûlées (kcal)");

    return (
      <div className="daily-custom-tooltip">
        <span className="tooltip-value">{weight.value} kg</span>
        <span className="tooltip-value">{calories.value} kcal</span>
      </div>
    );
  }
  return null;
};




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
 * @returns {JSX.Element}
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
    const day = userActivity[index].day;
    return index + 1;
  };


  // console.log(userActivity);
  // Render the user's activity chart



  return (
    <div className="Daily">
      <BarChart width={835} height={320} data={userActivity} dataKey="calories"


      >

        <Bar
          dataKey="kilograms"
          fill="#E6000"
          barSize={7}
          name="Poids (Kg)"
          radius={[3, 3, 0, 0]}

          yAxisId="Kilograms"
          onClick={(data, index, e) => console.log('kilograms', data)}
    zIndex={2}
        />
        <Bar
          dataKey="calories"
          barSize={7}
          name="Calories brûlées (kcal)"
          radius={[3, 3, 0, 0]}
          legendIcon={<CustomLegendIcon />}
          onClick={(data, index, e) => console.log('calories', data)}
zIndex={1}
        // yAxisId= "Calories"
        />




        <text className="Activite" x={90} y={40} textAnchor="middle" fontWeight={600} fontSize={15}>
          Activité quotidienne
        </text>
        <XAxis dataKey="day"
          tickCount={10}
          tickFormatter={formatLabel}
          tickLine={false}
          stroke="#999"
        />

        <YAxis
          orientation="right"
          dataKey="kilograms"
          domain={["dataMin - 1", "dataMax + 2"]}
          ticks={[60, 70, 80]}
          tickFormatter={(value) => `${value} `}
          yAxisId="Kilograms"
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "#999", // Set the stroke color to the desired shade of gray
            strokeWidth: 0.1 // Set the stroke width to make the tick lines more visible
          }}

        />
        <YAxis
          orientation="left"
          dataKey="calories"
          ticks={10}
          // yAxisId="calories"
          tickFormatter={(value) => `${value} `}
          domain={[0, "dataMax + 50"]}
          hide={true}
        />
        <Tooltip
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