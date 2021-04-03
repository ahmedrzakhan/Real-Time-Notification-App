import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./../components/Navbar/Navbar";
import Tabs from "./../components/shared/Tabs/Tabs";
import Form from "./../components/Dashboard/Form";
import Pending from "./../components/Dashboard/Pending";
import Approved from "./../components/Dashboard/Approved";
import Rejected from "./../components/Dashboard/Rejected";
import RequestForApproval from "./../components/Dashboard/RequestForApproval";
import { loadData } from "./../redux/store";

const Dashboard = () => {
  const isLoggedIn = loadData("user") && loadData("user").isLoggedIn;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar />
      <Tabs
        tabComponents={[
          <Form />,
          <Pending />,
          <Approved />,
          <RequestForApproval />,
          <Rejected />,
        ]}
        tabTitles={[
          "Form",
          "Pending",
          "Approved",
          "Request(For Approval)",
          "Rejected",
        ]}
      />
    </div>
  );
};

export default Dashboard;

export const NoApplicationsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
