import React, { useState, useEffect } from "react";
import { getUserPerformance } from "../../../dataManager/dataManager";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, } from "recharts";
import { useParams } from "react-router-dom";
import "./PerformanceChart.css";
/**
 * French names for the different kinds of performance.
 * @type {{energy: string, cardio: string, intensity: string, speed: string, strength: string, endurance: string}}
 */
const kindNamesInFrench = {
  energy: "Énergie",
  cardio: "Cardio",
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
};

/**
 * The desired order of the kinds for display on the chart.
 * @type {{intensity: number, speed: number, strength: number, endurance: number, energy: number, cardio: number}}
 */
const kindOrder = {
  intensity: 1,
  speed: 2,
  strength: 3,
  endurance: 4,
  energy: 5,
  cardio: 6,
};

/**
 * PerformanceChart component renders a radar chart showing the user's daily activity performance.
 * @returns {JSX.Element}
 */
function PerformanceChart() {
  const { userId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    /**
     * Fetches user performance data and updates the state.
     * @async
     */
    async function fetchData() {
      const userPerformanceData = await getUserPerformance(userId);
      const updatedData = userPerformanceData.data.map((item) => ({
        ...item,
        name: kindNamesInFrench[userPerformanceData.kind[item.kind]],
      })).sort((a, b) => kindOrder[userPerformanceData.kind[a.kind]] - kindOrder[userPerformanceData.kind[b.kind]]);

      setData(updatedData);
    }

    fetchData();
  }, [userId]);




  return (
    <div className="Perf" style={{ background: "#000000" }}>
      <RadarChart cx={129} cy={131.5} outerRadius={80} width={258} height={263} data={data} fill="white"
        stroke="white" legend={{ fontSize: 12, fontWeight: 'bold' }}>
        <PolarGrid className="polar-grid" radialLines={false} />
        <PolarAngleAxis
        stroke="white"
          dataKey="name"
          dy={4}
          tickLine={false}
          tick={{ stroke: "#yellow", strokeWidth: 0.4 }} style={{ fontSize: 12, fontWeight: 500 }} />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.7}
          style={{ fontSize: 12, fontWeight: "bold", fill: "red" }}
        />
      </RadarChart>
    </div>
  );
}

export default PerformanceChart;
