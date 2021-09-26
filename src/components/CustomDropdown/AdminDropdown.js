import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "../../assets/images/icons/select-arrow.svg";
import ArrowRight from "../../assets/images/arrowRight.svg";

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

AdminDropdown.propTypes = {
  option: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onChangeOption: PropTypes.func,
  pickerOption1: PropTypes.string,
  pickerOption2: PropTypes.string,
  customName: PropTypes.string,
  placeHolder: PropTypes.string,
  customValue: PropTypes.object,
};

export default function AdminDropdown({
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
  pickerOption1,
  pickerOption2,
  customName,

  placeHolder,
  customValue,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (selectedValue) => () => {
    let returnValue = {
      name: customName,
      value: selectedValue,
    };
    // setSelectedOption(value);
    setIsOpen(false);
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

  React.useEffect(() => {
    // setSelectedOption(customValue);
  }, [customValue]);
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
              {!isEmpty(customValue) ? (
                <span className="selected-select">
                  {customValue?.sourceFlagUrl && (
                    <span>
                      <img
                        alt=""
                        src={customValue?.sourceFlagUrl}
                        height="25px"
                        width="25px"
                      />
                    </span>
                  )}
                  {customValue[pickerOption1]}{" "}
                  <span className="arrow-right">
                    <img alt="" src={ArrowRight} height="15px" width="25px" />
                  </span>
                  {customValue?.destFlagUrl && (
                    <span>
                      <img
                        alt=""
                        src={customValue?.destFlagUrl}
                        height="25px"
                        width="25px"
                      />
                    </span>
                  )}
                  {customValue[pickerOption2]}{" "}
                </span>
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
                  <span>
                    {item?.sourceFlagUrl && (
                      <span>
                        <img
                          alt=""
                          src={item?.sourceFlagUrl}
                          height="25px"
                          width="25px"
                        />
                      </span>
                    )}
                    {item[pickerOption1]}{" "}
                    <span className="arrow-right">
                      <img alt="" src={ArrowRight} height="15px" width="25px" />
                    </span>
                    {item?.destFlagUrl && (
                      <span>
                        <img
                          alt=""
                          src={item?.destFlagUrl}
                          height="25px"
                          width="25px"
                        />
                      </span>
                    )}
                    {item[pickerOption2]}{" "}
                  </span>
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
