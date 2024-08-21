import React from "react";
import { useNavigate } from "react-router-dom";

const BackHomeFooter = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="backHomeFooter">
      <button onClick={backToHome}>Back Home !</button>
    </div>
  );
};

export default BackHomeFooter;
