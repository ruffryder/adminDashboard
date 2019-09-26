import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Administration with React and Redux</h1>
      <p>React, Redux and React Router for super-responsive web apps</p>
      <Link to="/about" className="btn btn-primary btn-lg">
        Learn more{" "}
      </Link>
    </div>
  );
}

export default HomePage;
