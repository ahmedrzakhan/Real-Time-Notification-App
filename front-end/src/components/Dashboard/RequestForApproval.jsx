import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "./../../redux/applicationsReducer/actions";
import RenderApplications from "./RenderApplications";
import { NoApplicationsContainer } from "./../../pages/Dashboard";
import { loadData } from "./../../redux/store";

const RequestForApproval = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);

  useEffect(() => {
    const payload = {
      assignedDepartment: loadData("user").userData.department,
      assignedToUserId: loadData("user").userData._id
    };
    dispatch(getApplications(payload));
  }, [dispatch]);

  if (!applications.length) {
    return (
      <NoApplicationsContainer>No applications awaiting Approval</NoApplicationsContainer>
    );
  }

  return <RenderApplications actionRequired applications={applications} />;
};

export default RequestForApproval;
