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
import { Link } from "react-router-dom";

function Home() {
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
    <div className="home-container">
      <div>
        <h1>MARHBEEE BIK!</h1>
        <p>Django POLYYYYYY</p>

        <video src="/homeVideo.mp4" autoPlay loop muted className="home-video">
          Your browser does not support the video tag.
        </video>
      </div>
      <Link className="btnbtn" to="/Member">
        <p className="styledtext">Next step !!</p>
      </Link>
    </div>
  );
}

export default Home;
