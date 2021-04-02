import React from "react";
import styled from "styled-components";
import { theme } from "./../../../theme/theme";

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.dark};
  outline: none;
  padding: 1rem;
  margin: 0.5rem;
  width: 85%;
`;
