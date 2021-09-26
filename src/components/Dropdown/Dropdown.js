import React, { Component } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
let name;

class Dropdowns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padding: "5px",
    };
  }

  componentDidMount = () => {
    //   name=item.this.props.itemsName
    if (this.props.isIcon) {
      this.setState({ padding: "50px" });
    }
  };

  render() {
    return (
      // this.props.options !== undefined && (
      <Form.Control
        as="select"
        id={this.props.id}
        onChange={this.props.handleChange}
        style={{ height: "50px", paddingLeft: this.state.padding }}
        value={this.props.value?.value}
      >
        <option value="" style={{ height: "30px" }}>
          {this.props.title}
          {name}
        </option>
        {this.props.options !== undefined &&
          this.props.options.map((item, index) => {
            return (
              <option value={item[this.props.pickerValue]} key={index}>
                {`${item[this.props.optionValue]} `}{" "}
                {this.props.optionValue2 && item[this.props?.optionValue2]}
              </option>
            );
          })}
        {this.props.loading && (
          <option value="" style={{ height: "30px" }} disabled>
            LOADING...
          </option>
        )}
      </Form.Control>
      // )
    );
  }
}

Dropdowns.defaultProps = {
  pickerValue: "id",
};

Dropdowns.propTypes = {
  isIcon: PropTypes.bool,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.object,
  title: PropTypes.string,
  options: PropTypes.array,
  optionValue: PropTypes.string,
  pickerValue: PropTypes.string.isRequired,
  optionValue2: PropTypes.string,
  loading: PropTypes.bool,
};
export default Dropdowns;
