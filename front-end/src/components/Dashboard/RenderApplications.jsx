import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateApplicationStatus } from "./../../redux/applicationsReducer/actions";
import { theme } from "./../../theme/theme";
import { loadData } from "./../../redux/store";

const RenderApplications = ({ applications, actionRequired }) => {
  const dispatch = useDispatch();
  const userId = loadData("user").userData._id;

  const handleActionClick = (e, application) => {
    // console.log("e", e.target.value);
    // console.log("application", application);
    // console.log("application", (application.status = e.target.value));
    // console.log("application", application);

    application.status = e.target.value;

    dispatch(updateApplicationStatus(application));
  };

  return (
    <RenderApplicationsContainer>
      {applications.map((application) => (
        <Card key={application._id}>
          <AssignedContainer>
            <Row>
              <Title>Assigned To:&nbsp;</Title>
              {application.assignedToUserName} (
              {application.assignedToUserEmail})
            </Row>
            <Row>
              <Title>Assigned Department:&nbsp;</Title>
              {application.assignedDepartment}
            </Row>
          </AssignedContainer>
          <Row>
            <Title>Status:&nbsp;</Title>
            {application.status}
          </Row>
          <Row>
            <Title>Message:&nbsp;</Title>
            {application.message}
          </Row>
          {actionRequired && (
            <>
              <AssignedContainer>
                <Row>
                  <Title>Created By:&nbsp;</Title>
                  {application.createdByUserName} (
                  {application.createdByUserEmail})
                </Row>
                <Row>
                  <Title>Department:&nbsp;</Title>
                  {application.department}
                </Row>
              </AssignedContainer>
              <Row actionRow onClick={(e) => handleActionClick(e, application)}>
                <ActionButton
                  approve
                  actionAllowed={userId === application.assignedToUserId}
                  disabled={userId !== application.assignedToUserId}
                  value={"Approved"}
                >
                  Approve
                </ActionButton>
                <ActionButton
                  actionAllowed={userId === application.assignedToUserId}
                  disabled={userId !== application.assignedToUserId}
                  value={"Rejected"}
                >
                  Reject
                </ActionButton>
              </Row>
            </>
          )}
        </Card>
      ))}
    </RenderApplicationsContainer>
  );
};

export default RenderApplications;

const RenderApplicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
`;

export const Card = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
  margin: 1rem 0;
  padding: 1.5rem 2rem;
  width: 35rem;
`;

const AssignedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Title = styled.i`
  font-weight: 700;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: ${({ actionRow }) => (actionRow ? "space-evenly" : "start")};
  margin-bottom: ${({ actionRow }) => (actionRow ? "0.375rem" : "1rem")};
  margin-top: ${({ actionRow }) => (actionRow ? "0.5rem" : 0)};
`;

const ActionButton = styled.button`
  background: ${({ approve }) => (approve ? theme.success : theme.danger)};
  border: none;
  border-radius: 0.5rem;
  color: ${theme.secondary};
  cursor: ${({ actionAllowed }) => (actionAllowed ? "pointer" : "not-allowed")};
  font-weight: 700;
  padding: 0.5rem 1rem;
`;
