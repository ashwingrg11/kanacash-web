import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import "../../assets/css/style.css";
import { connect } from "react-redux";
import GreenTick from "../../assets/images/icons/greenTick.svg";
import PropTypes from "prop-types";
import CustomSpinner from "../../components/CustomSpinner";
import CustomModal from "../../components/Modal/CustomModal";

import { deleteSenderCard } from "../../store/actions/senderDetail";

class SenderDebitCard extends Component {
  state = { showLoader: false, showConfirmModal: false, isSubmitting: false };

  deleteCard = async (id) => {
    this.setState({ isSubmitting: true });

    let deleteStatus = await this.props.deleteSenderCard(id);
    if (deleteStatus.delete) {
      this.props.deleteCard(id);
      this.setState({ isSubmitting: false, showConfirmModal: false });
    } else {
      this.props.errorWhileDeletingCard(deleteStatus);
      this.setState({ isSubmitting: false, showConfirmModal: false });
    }
  };
  render() {
    // console.log("card",this.props.detail)
    return (
      <>
        <Col sm="12" lg="6" className="card-block">
          <Card className="account-card-block">
            {this.state.showLoader && <CustomSpinner />}
            <Row>
              <Col>
                <Row>
                  <Col style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {this.props.detail.funding_source_name}{" "}
                    <img
                      src={GreenTick}
                      alt="GreenTick"
                      style={{ marginLeft: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col style={{ fontSize: "16px" }}>
                    Nick name: <b>{this.props.detail.nick_name}</b>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ fontSize: "16px" }}>
                    Network: <b>{this.props.detail.institution_name}</b>
                  </Col>
                  <Col style={{ fontWeight: "bold" }}></Col>
                </Row>
                <Row>
                  <Col
                    className="d-flex justify-content-end align-items-end"
                    onClick={() => {
                      this.setState({ showConfirmModal: true });

                      // this.deleteCard(this.props.detail.id);
                    }}
                    style={{
                      color: `${COLORS.RED_COLOR}`,
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Remove debit card
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
            body: "Do you really want to remove this Card account?",
          }}
          handleDelete={() => this.deleteCard(this.props.detail.id)}
        />
      </>
    );
  }
}

const mapActionToProps = { deleteSenderCard };

SenderDebitCard.propTypes = {
  deleteSenderCard: PropTypes.bool,
};
SenderDebitCard.propTypes = {
  detail: PropTypes.object,
  deleteCard: PropTypes.func,
  errorWhileDeletingCard: PropTypes.func,
};
export default connect(null, mapActionToProps)(SenderDebitCard);
