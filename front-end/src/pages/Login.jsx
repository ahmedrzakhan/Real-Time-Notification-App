import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "./../redux/authReducer/actions";
import styled from "styled-components";
import FormContainer from "./../components/shared/FormContainer/FormContainer";
import Input from "./../components/shared/Input/Input";
import Button from "./../components/shared/Button/Button";
import { theme } from "./../theme/theme";

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
          autoFocus
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
      <RouteToContainer>
        Need an Account
        <AuthButton onClick={() => history.push("/signup")}>Signup</AuthButton>
      </RouteToContainer>
    </FormContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteToContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const AuthButton = styled.button`
  border: none;
  color: ${theme.primary};
  cursor: pointer;
  background: ${theme.secondary};
  font-size: 1rem;
`;
