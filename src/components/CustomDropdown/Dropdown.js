import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "./dropdownArrow.svg";
import {
  MainContainer,
  DropDownContainer,
  DropDownWithoutTextInputHeader,
  DropDownListContainer,
  Row,
  DropDownList,
  ListItem,
  Label,
  Button,
} from "./StyledComponent";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";

Dropdown.defaultProps = {
  containerWidth: "20rem",
};

export default function Dropdown({
  /**
   * list of array: dropdown list
   */
  option,
  /**
   * text lebel for the dropdown option
   */
  label,
  /**
   * width for the container
   */
  onClick,
  /**
   * function to get selectedPicker object in parent
   */
  onChangeOption,
  pickerOption,
  containerWidth,
  customName,
  customValue,

  placeHolder,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    // setSelectedOption(value);
    setIsOpen(false);
    let returnValue = {
      name: customName,
      value: value,
    };
    onChangeOption(returnValue);
  };

  /**
   * Hook that hide dropdown list if clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * hide if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <MainContainer ref={wrapperRef}>
      <DropDownContainer className="input-dropdown" style={{ width: "100%" }}>
        <DropDownWithoutTextInputHeader
          onClick={toggling}
          className="custom-wrap"
        >
          {label && <Label>{label}</Label>}
          <Row>
            <div className="selected-country">
              {customValue?.flagUrl && (
                <span>
                  <img
                    alt=""
                    src={customValue?.flagUrl}
                    style={{ marginRight: "0px" }}
                  />
                </span>
              )}
              {!isEmpty(customValue) ? (
                customValue[pickerOption]
              ) : (
                <span>{placeHolder}</span>
              )}
            </div>
            <img alt="arrow-dwon" src={dropdownArrow} />
          </Row>
        </DropDownWithoutTextInputHeader>
        {isOpen && (
          <DropDownListContainer className="show-country-dd">
            <DropDownList>
              {option.map((item) => (
                <ListItem onClick={onOptionClicked(item)} key={Math.random()}>
                  {item?.flagUrl && (
                    <span>
                      <img
                        alt=""
                        src={item.flagUrl}
                        height="28px"
                        width="28px"
                        style={{ marginRight: 10 }}
                      />
                    </span>
                  )}
                  {item[pickerOption]}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {onClick && <Button onClick={onClick}>Send</Button>}
    </MainContainer>
  );
}

Dropdown.propTypes = {
  option: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onChangeOption: PropTypes.func,
  pickerOption: PropTypes.string,
  containerWidth: PropTypes.string,
  customValue: PropTypes.object,
  customName: PropTypes.string,
  placeHolder: PropTypes.string,
};
