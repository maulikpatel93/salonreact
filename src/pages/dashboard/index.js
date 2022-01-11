import React from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  console.log(dispatch);
  return (
    <>
      <div className="page-content">
        <div className="container mx-auto">
        </div>
      </div>
    </>
  );
};

export default Dashboard;
