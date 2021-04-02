import React from "react";
import styled from "styled-components";
import { theme } from "./../../../theme/theme";

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;

const StyledButton = styled.div`
  background: ${theme.primary};
  border-radius: 0.25rem;
  border: none;
  color: ${theme.secondary};
  cursor: pointer;
  font-weight: 700;
  padding: 0.75rem;
  margin: 1rem 0.5rem;
  text-align: center;
  width: 90%;
`;
