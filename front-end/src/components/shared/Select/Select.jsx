import React from "react";
import styled from "styled-components";

const Select = ({ header, options, onChange }) => {
  return (
    <>
      <Header>{header}</Header>
      <StyledSelect onChange={onChange}>
        {typeof options[0] === "string" && (
          <option key={""} value={""}></option>
        )}
        {options.map((option) => {
          if (typeof option === "object") {
            return <option key={option._id}>{option.name}</option>;
          } else {
            return <option key={option}>{option}</option>;
          }
        })}
      </StyledSelect>
    </>
  );
};

export default Select;

const StyledSelect = styled.select`
  padding: 0.5rem;
  margin: 0.5rem;
`;

const Header = styled.div`
  font-size: 0.75rem;
  margin-left: 0.75rem;
  margin-top: 0.75rem;
`;
