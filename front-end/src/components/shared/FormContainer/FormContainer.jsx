import React from "react";
import styled from "styled-components";
import { theme } from "./../../../theme/theme";

const FormContainer = ({ children, header }) => {
  return (
    <FormWrapper>
      <StyledContainer>
        <Header>{header}</Header>
        {children}
      </StyledContainer>
    </FormWrapper>
  );
};

export default FormContainer;

const FormWrapper = styled.div`
  align-items: center;
  display: flex;
  top: 20%;
  position: absolute;
  justify-content: center;
  width: 100vw;
`;

const Header = styled.div`
  color: ${theme.ternary};
  font-weight: 700;
  text-align: center;
`;

const StyledContainer = styled.div`
  border-radius: 0.25rem;
  padding: 2rem 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2), -2px -2px 8px rgba(0, 0, 0, 0.2);
  width: 25rem;
`;
