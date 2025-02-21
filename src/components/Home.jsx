import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>MARHBEEE BIK!</h1>
      <p>Django POLYYYYYY</p>

      <video src="/homeVideo.mp4" autoPlay loop muted className="home-video">
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Home;
