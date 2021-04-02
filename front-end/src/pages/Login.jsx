import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "./../redux/authReducer/actions";
import styled from "styled-components";
import FormContainer from "./../components/shared/FormContainer/FormContainer";
import Input from "./../components/shared/Input/Input";
import Button from "./../components/shared/Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };
    dispatch(loginUser(payload)).then(() => history.push("/dashboard"));
  };

  return (
    <FormContainer header={"Welcome Back!"}>
      <LoginContainer>
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
        <Button onClick={handleLogin}>Log In</Button>
      </LoginContainer>
    </FormContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
