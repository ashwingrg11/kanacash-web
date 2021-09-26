/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import dropdownArrow from "./dropdownArrow.svg";
import {
  MainContainer,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  Row,
  DropDownList,
  ListItem,
  Label,
  Button,
  InputText,
} from "./StyledComponent";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

// to fetch flag
const imgSrc = (countryCode) =>
  `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${countryCode.toLowerCase()}.svg`;
export default function InputDropdown({
  /**
   * Dropdown list
   */
  option,
  /**
   * label
   */
  label,
  /**
   * pass onClick function to show button
   */
  onClick,
  /**
   * width for the container
   */
  /**
   * function to get selectedPicker object in parent
   */
  onChangeOption,
  /**
   * selected dropdown value
   */
  value,
  /**
   * picker value for dropdown list: default to 'name'
   */
  pickerValue,

  /**to show loading indicator in dropdown [bool] */
  loading,
}) {
  // ref to handle if user click outside of elements
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setSearchText(value.name);
    setIsOpen(false);
    onChangeOption(value);
  };

  const onChangeText = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
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

  /**
   * #1 filterData: search as user start typing
   * #2 findcountry: if country is found as user is typing it will auto selet the matching country
   * #3 if country doest match from option avilable when user start updating text input clear selectedOption by default
   */
  React.useEffect(() => {
    // #1
    let filterdata = option.filter((item) => {
      return item[pickerValue].toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchData(filterdata);

    // #2
    let findCountry = filterdata.find((item) => {
      return item[pickerValue].toLowerCase() === searchText;
    });
    if (findCountry) {
      setSelectedOption(findCountry);
      onChangeOption(findCountry);
    }

    // #3
    if (!!selectedOption) {
      if (searchText !== selectedOption.name) {
        setSelectedOption(null);
        onChangeOption(null);
      }
    }
  }, [option, searchText]);

  React.useEffect(() => {
    if (value) {
      setSelectedOption(value);
      setSearchText(value[pickerValue]);
    }
  }, [value]);

  /**
   * set Selected value first array form option by default
   */
  // React.useEffect(() => {
  //   const firstArry = option[0];
  //   if (firstArry) {
  //     setSelectedOption(option[0]);
  //     setSearchText(option[0][pickerValue]);
  //   }
  // }, [option]);

  return (
    <MainContainer ref={wrapperRef}>
      <DropDownContainer className="input-dropdown">
        <DropDownHeader
          button={onClick}
          onClick={toggling}
          className="custom-wrap"
        >
          {label && <Label>{label}</Label>}
          <Row>
            <div className="selected-country">
              {selectedOption?.two_char_code && (
                <span>
                  <img
                    alt=""
                    src={imgSrc(selectedOption.two_char_code)}
                    style={{ marginRight: 10 }}
                  />
                </span>
              )}
              <InputText
                placeholder="Select a country"
                onChange={onChangeText}
                value={searchText}
              />
            </div>
            <img alt="arrow-dwon" src={dropdownArrow} />
          </Row>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer className="show-country-dd">
            <DropDownList>
              {searchData.map((item) => {
                return (
                  <ListItem onClick={onOptionClicked(item)} key={item.name}>
                    <span>
                      <img
                        alt=""
                        src={imgSrc(item.two_char_code)}
                        style={{ marginRight: 10 }}
                      />
                    </span>
                    {item[pickerValue]}
                  </ListItem>
                );
              })}
              {loading ? (
                <span className="mt-2 mb-2 pl-3" onClick={false}>
                  LOADING...
                </span>
              ) : (
                searchData.length === 0 && (
                  <ListItem>Country not found</ListItem>
                )
              )}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {onClick && (
        <Button onClick={onClick} className="btn btn-primary btn-theme">
          Send
        </Button>
      )}
    </MainContainer>
  );
}

InputDropdown.propTypes = {
  option: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onChangeOption: PropTypes.func,
  value: PropTypes.object,
  pickerValue: PropTypes.string,
  loading: PropTypes.bool,
};

InputDropdown.defaultProps = {
  containerWidth: "20rem",
  pickerValue: "name",
};
