import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "./../../redux/applicationsReducer/actions";
import RenderApplications from "./RenderApplications";
import { NoApplicationsContainer } from "./../../pages/Dashboard";
import { loadData } from "./../../redux/store";

const Rejected = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);

  useEffect(() => {
    const payload = {
      createdByUserId: loadData("user").userData._id,
      status: "Rejected",
    };
    dispatch(getApplications(payload));
  }, [dispatch]);

  if (!applications.length) {
    return (
      <NoApplicationsContainer>No Rejected applications</NoApplicationsContainer>
    );
  }

  return <RenderApplications applications={applications} />;
};

export default Rejected;
