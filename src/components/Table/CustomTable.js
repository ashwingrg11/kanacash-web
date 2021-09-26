import React, { Component } from "react";
import "./CustomTable.css";
import PropTypes from "prop-types";
import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";
import { connect } from "react-redux";
class CustomTable extends Component {
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

  renderFlatFee = (feeRangesData, itemName) => {
    return feeRangesData.map((item, index) => (
      <div key={`${item[itemName]}-${index}`}>
        <p style={{ paddingBottom: "5px" }}>{item[itemName]}</p>
      </div>
    ));
  };
  updateEdit = (data) => {
    // this.props.getActiveAccountSideBar("AddFeeSet");
    this.props.history.push({ pathname: `${ROUTES.ADD_FEE_SET}`, data: data });
  };

  dataFill = (data) => {
    return (
      <>
        <td style={{ padding: "10px" }}>{data.paymentMethod}</td>
        <td style={{ padding: "10px" }}>{data.payoutMethod}</td>
        <td style={{ padding: "10px" }}>{data.currency}</td>
        <td style={{ padding: "10px" }}>
          {this.renderFlatFee(data.feeRanges, "minAmount")}
        </td>
        <td style={{ padding: "10px" }}>
          {this.renderFlatFee(data.feeRanges, "maxAmount")}
        </td>
        <td style={{ padding: "10px" }}>
          {this.renderFlatFee(data.feeRanges, "flatFee")}
        </td>
        <td style={{ padding: "10px" }}>
          {this.renderFlatFee(data.feeRanges, "percentageFee")}
        </td>
        <td style={{ padding: "10px" }}>
          <button
            className="btn btn-secondary"
            onClick={() => this.updateEdit(data)}
          >
            Edit
          </button>{" "}
        </td>
      </>
    );
  };

  renderTableData() {
    return this.props.dataTableData.map((data, index) => {
      return (
        <tr style={{ height: "45px", paddingBottom: "0px" }} key={index}>
          {this.dataFill(data)}
        </tr>
      );
    });
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

CustomTable.propTypes = {
  tableHeader: PropTypes.array,
  keys: PropTypes.array,
  dataTableData: PropTypes.array,
  getActiveAccountSideBar: PropTypes.func,
  history: PropTypes.object,
};

const mapDispatchToProps = { getActiveAccountSideBar };
export default connect(null, mapDispatchToProps)(withRouter(CustomTable));
