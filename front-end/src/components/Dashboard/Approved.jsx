import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "./../../redux/applicationsReducer/actions";
import RenderApplications from "./RenderApplications";
import { NoApplicationsContainer } from "./../../pages/Dashboard";
import { loadData } from "./../../redux/store";

const Approved = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);

  useEffect(() => {
    const payload = {
      createdByUserId: loadData("user").userData._id,
      status: "Approved",
    };
    dispatch(getApplications(payload));
  }, [dispatch]);

  if (!applications.length) {
    return (
      <NoApplicationsContainer>No Approved applications</NoApplicationsContainer>
    );
  }

  return <RenderApplications applications={applications} />;
};

export default Approved;
