import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadData } from "./../../redux/store";
import {
  addApplication,
  getDepartmentUsers,
  getOtherDepartments,
} from "./../../redux/applicationsReducer/actions";
import { Card, Title } from "./RenderApplications";
import Select from "./../shared/Select/Select";
import { theme } from "./../../theme/theme";

const Form = () => {
  const userData = loadData("user").userData;

  const departmentUsers = useSelector(
    (state) => state.applications.departmentUsers
  );

  const [assignedDepartment, setAssignedDepartment] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [message, setMessage] = useState("");

  let assignedToUserId, selectedIndex;

  const dispatch = useDispatch();

  let otherDepartments = useSelector(
    (state) => state.applications.otherDepartments
  );

  useEffect(() => {
    dispatch(getOtherDepartments(userData.department));
  }, [dispatch, userData.department]);

  const handleChangeDepartment = (e) => {
    const payload = {
      department: e.target.value,
    };
    setAssignedDepartment(e.target.value);

    dispatch(getDepartmentUsers(payload));
  };

  const handleChangeAssignedUser = (e) => {
    selectedIndex = e.target.options.selectedIndex;
    setAssignedUser(e.target.value);
  };

  const handleAddApplication = () => {
    if (!departmentUsers.length || !message.length) {
      alert("Please fill all the fields");
      return;
    }
    const assignedToUserEmail = departmentUsers.find(
      (user) => user.id === assignedToUserId
    ).email;

    assignedToUserId =
      departmentUsers[selectedIndex] && departmentUsers[selectedIndex]._id;

    const payload = {
      assignedToUserId: assignedToUserId || departmentUsers[0]._id,
      assignedToUserName: assignedUser || departmentUsers[0].name,
      assignedToUserEmail,
      assignedDepartment,
      createdByUserId: userData._id,
      createdByUserName: userData.name,
      createdByUserEmail: userData.email,
      createdDate: new Date(),
      department: userData.department,
      message,
      status: "Pending",
    };

    dispatch(addApplication(payload));
  };

  return (
    <FormContainer>
      <Card>
        <Row>
          <Title>Assign To</Title>
        </Row>
        <Row>
          <div>
            <Select
              header={"Department"}
              options={otherDepartments}
              onChange={(e) => handleChangeDepartment(e)}
              value={assignedDepartment}
            />
          </div>
          <div>
            <Select
              header={"User"}
              onChange={handleChangeAssignedUser}
              options={departmentUsers}
              value={assignedUser}
            />
          </div>
        </Row>
        <TextareaContainer>
          Message:
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </TextareaContainer>
        <AddButtonContainer>
          <AddButton onClick={handleAddApplication}>ADD</AddButton>
        </AddButtonContainer>
      </Card>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextareaContainer = styled.div`
  align-items: center;
  display: flex;
  margin-top: 1rem;
`;

const Textarea = styled.textarea`
  width: 80%;
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button`
  background: ${theme.primary};
  border: 0;
  border-radius: 0.25rem;
  color: ${theme.secondary};
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;
