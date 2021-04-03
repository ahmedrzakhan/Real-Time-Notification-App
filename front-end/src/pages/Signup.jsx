import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getDepartments, registerUser } from "./../redux/authReducer/actions";
import { AuthButton, RouteToContainer } from "./Login";
import FormContainer from "./../components/shared/FormContainer/FormContainer";
import Input from "./../components/shared/Input/Input";
import Select from "./../components/shared/Select/Select";
import Button from "./../components/shared/Button/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const departments = useSelector((state) => state.auth.departments);
  const [department, setDepartment] = useState(departments[0]);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSignup = () => {
    if (!email.length || !password.length || !name.length) {
      alert("Fill all the fields");
      return;
    }

    const payload = {
      date: new Date(),
      department,
      email,
      password,
      name,
    };
    dispatch(registerUser(payload)).then(() => history.push("/"));
  };

  return (
    <FormContainer header={"Welcome"}>
      <SignupContainer>
        <Input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          value={name}
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <Select
          header={"Department"}
          options={departments}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Button onClick={handleSignup}>Signup</Button>
        <RouteToContainer>
          Already have an account
          <AuthButton onClick={() => history.push("/")}>Login</AuthButton>
        </RouteToContainer>
      </SignupContainer>
    </FormContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
