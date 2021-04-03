import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderApplications from "./RenderApplications";
import { NoApplicationsContainer } from "./../../pages/Dashboard";
import { getApplications } from "./../../redux/applicationsReducer/actions";
import { loadData } from "./../../redux/store";

const Pending = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);

  useEffect(() => {
    const payload = {
      createdByUserId: loadData("user").userData._id,
      status: "Pending",
    };
    dispatch(getApplications(payload));
  }, [dispatch]);

  if (!applications.length) {
    return (
      <NoApplicationsContainer>No Pending applications</NoApplicationsContainer>
    );
  }

  return <RenderApplications applications={applications} />;
};

export default Pending;
