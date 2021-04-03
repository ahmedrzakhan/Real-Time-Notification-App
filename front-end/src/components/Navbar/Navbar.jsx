import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "./../../theme/theme";

const Navbar = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <NavbarContainer>
      <Title>Home</Title>
      <LogoutContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </LogoutContainer>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  background: ${theme.secondary};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
`;

const LogoutContainer = styled.div``;

const LogoutButton = styled.button`
  background: ${theme.primary};
  border-radius: 0.25rem;
  color: ${theme.secondary};
  cursor: pointer;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border: 0;
`;
