import React, { Component } from "react";
import "./CustomTable.css";
import PropTypes from "prop-types";
class ClientDashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: [],
    };
  }
  componentDidMount = () => {
    // console.log("data",Object.keys(this.props.tableData[0]))
    // this.setState({dataId:Object.keys(this.props.tableData[0])})
  };

  renderTableHeader = () => {
    return this.props.tableHeader.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  dataFill = (data) => {
    return this.props.keys.map((id, index) => {
      return <td key={index}>{data[id]}</td>;
    });
  };

  renderTableData() {
    if (this.props.dataTableData.length !== 0) {
      return this.props.dataTableData.map((data, index) => {
        return (
          <tr style={{ height: "45px" }} key={index}>
            {this.dataFill(data)}
          </tr>
        );
      });
    }
    else {
      return (
        <tr style={{ height: "45px",  }}>
          <td colSpan="4">There are no records to be shown.</td>
        </tr>
      );
    }
  }
  render() {
    return (
      <>
        <table id="customTable">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </>
    );
  }
}

ClientDashboardTable.propTypes = {
  tableHeader: PropTypes.array,
  keys: PropTypes.array,
  dataTableData: PropTypes.array,
};

export default ClientDashboardTable;
