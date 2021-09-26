import styled from "styled-components";

export const Input = styled("input")`
  color: #828282;
  font-size: 1.2rem;
  border: 1px solid #dee2e6;
  width: ${({ width }) => width || "10.5em"};
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  height: 2.5rem;
  padding: 0px 4px;
  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 5px #719ece;
  }
`;
