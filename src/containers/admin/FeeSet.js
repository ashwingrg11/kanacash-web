import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";

import COLORS from "../../assets/Color/Color";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomTable from "../../components/Table/CustomTable";
import { isEmpty } from "../../utils/isEmpty";

class FeeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelData: [],
      tableHeader: [
        "PAYMENT METHOD",
        "PAYOUT METHOD",
        "CURRENCY",
        "MIN AMOUNT",
        "MAX AMOUNT",
        "FLAT FEE",
        "percentage FEE",
        "Action",
      ],
      keys: [
        "paymentMethod",
        "payoutMethod",
        "currency",
        "minAmount",
        "maxAmount",
        "flatFee",
        "fee",
      ],
    };
  }
  componentDidMount = () => {
    if (!isEmpty(this.props.feeStructure))
      this.setState({ tabelData: this.props.feeStructure });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.feeStructure !== this.props.feeStructure) {
      this.setState({ tabelData: this.props.feeStructure });
    }
  };
  render() {
    return (
      <>
        <Row>
          <Col
            style={{
              color: `${COLORS.BLACK_COLOR}`,
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            Fee Set
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="">
            <Card className="p-4">
              <Row>
                <Col
                  style={{
                    height: "50px",
                    backgroundColor: `${COLORS.LIGHT_BLUE}`,
                    border: ` 1px solid ${COLORS.BLUE_COLOR}`,
                  }}
                  className="d-flex align-items-center mr-2 ml-2"
                >
                  Current active fee sets{" "}
                </Col>
              </Row>
              <Row>
                <Col className="p-2">
                  <div className="table-responsive">
                    <CustomTable
                      dataTableData={this.state.tabelData}
                      tableHeader={this.state.tableHeader}
                      keys={this.state.keys}
                    ></CustomTable>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
FeeSet.propTypes = {
  feeStructure: PropTypes.array,
};

const mapStateToProps = (state) => ({
  feeStructure: state.admin.feeStructure,
});

export default connect(mapStateToProps, null)(withRouter(FeeSet));
