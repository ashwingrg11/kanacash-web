import styled from "styled-components";

export const MainContainer = styled("div")`
  display: flex;
`;

export const DropDownContainer = styled("div")`
  width: ${(props) => props.width || "10.5em"};
`;

export const DropDownHeader = styled("div")`
  margin-bottom: 0.1rem;
  padding: 0.4rem;
  font-weight: 500;
  font-size: 1.3rem;
  border: 1px solid black;
  border-right: ${({ button }) => (button ? "none" : "1px solid black")};

  border-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: ${({ button }) => (button ? "0px" : "8px")};
  border-bottom-right-radius: ${({ button }) => (button ? "0px" : "8px")};
`;

export const DropDownWithoutTextInputHeader = styled("div")`
  margin-bottom: 0.1rem;
  padding: 0.4rem;
  font-weight: 500;
  font-size: 1.3rem;
  border: 1px solid #BDBDBD;

`;
export const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  background-color: white;
  width: ${({ width }) => width || "10.5em"};
`;

export const Row = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const DropDownList = styled("ul")`
  border: 1px solid #d3d3d3;
  border-radius: 0px;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 400;
  padding-left:10px;
  cursor:pointer;
`;

export const ListItem = styled("li")`
  display: flex;
  list-style: none;
  &:hover {
    color: red;
  }
`;

export const Label = styled("span")`
  color: #828282;
  font-size: 0.8rem;
`;

export const Button = styled("button")`
  padding: 0rem 2rem 0rem 2rem;
  border: 1px solid #d3d3d3;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #3db76c;
  color: #fff;
`;

export const InputText = styled("input")`
  color: #828282;
  font-size: 0.9rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
