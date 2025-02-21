import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Stat() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/members/");
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Transform data to count members per country
  const countryCount = members.reduce((acc, member) => {
    acc[member.country] = (acc[member.country] || 0) + 1;
    return acc;
  }, {});

  // Convert object to array for Recharts
  const chartData = Object.entries(countryCount).map(([country, count]) => ({
    country,
    count,
  }));

  return (
    <div className="stat">
      <div className="stat-container">
        <div className="header-stat">
          <h1>Stat part!</h1>
          <p>Country per user !!!!!</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div>
            <BarChart width={730} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stat;
