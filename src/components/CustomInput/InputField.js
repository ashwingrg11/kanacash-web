import React from "react";
import { Input } from "./StyledComponent";
import PropTypes from "prop-types";
InputField.defaultProps = {
  customWidth: "20rem",
};
InputField.propTypes = {
  type: PropTypes.string,
  customWidth: PropTypes.string,
  onChangeValue: PropTypes.func,
  placeHolder: PropTypes.string,
  customName: PropTypes.string,
  customValue: PropTypes.any,
  style: PropTypes.any,
};
export default function InputField({
  type,
  customWidth,
  onChangeValue,
  placeHolder,
  customName,
  customValue,
  style,
}) {
  const onValueChange = (e) => {
    e.persist();
    let returnValue;
    if (e.target.value === "") {
      returnValue = {
        name: e.target.name,
        value: "",
      };
    } else {
      returnValue = {
        name: e.target.name,
        value: parseInt(e.target.value),
      };
    }
    onChangeValue(returnValue);
  };
  //   const [value, setValue] = React.useState("");
  //   React.useEffect(() => {
  //     if (customValue !== "") {
  // setValue()    }
  // }, [customValue]);
  return (
    <Input
      type={type}
      onChange={onValueChange}
      width={customWidth}
      placeholder={placeHolder}
      value={customValue}
      name={customName}
      style={style}
    />
  );
}
