import React, { Component } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import "../../assets/css/style.css";
import { connect } from "react-redux";
import { deleteSenderBank } from "../../store/actions/senderDetail";
import GreenTick from "../../assets/images/icons/greenTick.svg";
import PropTypes from "prop-types";
import CustomModal from "../../components/Modal/CustomModal";

class SenderBank extends Component {
  state = { showLoader: false, showConfirmModal: false, isSubmitting: false };

  deleteBank = async (id) => {
    this.setState({ isSubmitting: true });
    let deleteStatus = await this.props.deleteSenderBank(id);
    if (deleteStatus.delete) {
      this.props.deleteBank({ id: id });
      this.setState({ isSubmitting: false, showConfirmModal: false });
    } else {
      this.setState({ isSubmitting: false, showConfirmModal: false });

      this.props.errorWhileDeletingBank(deleteStatus);
    }
  };

  render() {
    const detail = this.props.detail;
    return (
      <>
        <Col sm="12" lg="6" className="card-block">
          {" "}
          <Card
            className="account-card-block"
            // style={{ margin: "10px 10px 0px 0px", padding: "20px", width: "48%" }}
          >
            {this.state.showLoader && (
              <div className="block-spinner">
                <Spinner animation="border" />
              </div>
            )}

            <Row>
              <Col>
                <Row>
                  <Col style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {detail.funding_source_name}{" "}
                    <img
                      src={GreenTick}
                      alt="GreenTick"
                      style={{ marginLeft: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col style={{ fontSize: "16px" }}>
                    Account Holder: <b>{detail.account_holder_name}</b>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ fontSize: "16px" }}>
                    Account Type: <b>{detail.account_type}</b>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="d-flex justify-content-end align-items-end"
                    onClick={() => {
                      this.setState({ showConfirmModal: true });
                      // this.deleteBank(detail.id);
                    }}
                    style={{
                      color: `${COLORS.RED_COLOR}`,
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Remove Bank
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <CustomModal
          isSubmitting={this.state.isSubmitting}
          show={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
          detail={{
            title: "Are you sure?",
            body: "Do you really want to remove this Bank account?",
          }}
          handleDelete={() => this.deleteBank(detail.id)}
        />
      </>
    );
  }
}

const mapActionToProps = { deleteSenderBank };

SenderBank.propTypes = {
  detail: PropTypes.object,
  deleteBank: PropTypes.func,
  errorWhileDeletingBank: PropTypes.func,
  deleteSenderBank: PropTypes.func,
};

export default connect(null, mapActionToProps)(SenderBank);
