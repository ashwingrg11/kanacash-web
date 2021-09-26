import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ROUTES from "../../assets/Routes/Routes";
import PlusImg from "../../assets/images/icons/Plus.svg";
import CustomSpinner from "../../components/CustomSpinner";
import BeneficiaryCard from "./BeneficiaryCard";
import {
  getBeneficiaries,
  getActiveAccountPage,
} from "../../store/actions/senderDetail";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";

import KYCWidget from "../../components/Modal/WidgetModal";
class BenificiaryList extends Component {
  state = {
    beneficiaryList: [],
    showKyc: false,
  };

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      this.props.getBeneficiaries();
    }
  };

  componentWillUnmount = () => {
    this._mount = false;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.beneficiary !== this.props.beneficiary) {
      this.setState({ beneficiaryList: this.props.beneficiary });
    }
  };

  verifyKyc = (value) => {
    if (value.status === "VERIFIED") {
      if (this._mount) {
        this.props.kycVerification();
        this.props.getCurrentUser();
      }
    }
  };

  addNewBeneficiary = () => {
    if (this.props.user.status === "VERIFIED") {
      this.props.history.push(`${ROUTES.BENEFICIARY_CREATE}`);
    } else {
      const user = this.props.user
      if(user.isPhoneVerified !== 0 && user.isEmailVerified !== 0 ){
        this.setState({ showKyc: true });
  
      }else if (user.isPhoneVerified === 0){
        this.props.history.push(`${ROUTES.PHONE_VERIFICATION}`)
      }else if(user.isEmailVerified === 0 && user.isPhoneVerified !== 0){
        this.props.history.push(`${ROUTES.EMAIL_VERIFICATION}`)
  
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row> 
          <Col>
            <Row>
              <Col className="activity-title">Beneficiary</Col>
              <Col
                className="d-flex justify-content-end align-items-center pl-0 anchor-plus"
                onClick={() => {
                  this.addNewBeneficiary();
                }}
              >
                <img src={PlusImg} alt="PlusImg" />
                Add the beneficiary
              </Col>
            </Row>

            <Row className="mt-3">
              {this.props.loader ? (
                <div style={{ height: "50vh" }}>
                  {" "}
                  <CustomSpinner />
                </div>
              ) : this.state.beneficiaryList.length !== 0 ? (
                this.state.beneficiaryList.map((beneficiary, index) => {
                  return (
                    <BeneficiaryCard
                      detail={beneficiary}
                      key={index}
                      handleChange={this.props.handleChange}
                      editedBeneficiary={this.props.editedBeneficiary}
                    />
                  );
                })
              ) : (
                <Col className="no-items" key="1">
                  <p>There are no records to be shown.</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        {this._mount && (
          <KYCWidget
            show={this.state.showKyc}
            close={() => this.setState({ showKyc: false })}
            type="kyc"
            handleChange={(e) => this.verifyKyc(e)}
            // showAlert={()=>this.showAlert}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  user: state.auth.user,
  loader: state.loader.presentLoader,
});
const mapActionToProps = {
  getBeneficiaries,
  getActiveAccountPage,
  getCurrentUser,
};

BenificiaryList.propTypes = {
  history: PropTypes.object,
  getBeneficiaries: PropTypes.func,
  user: PropTypes.object,
  beneficiary: PropTypes.array,
  handleChange: PropTypes.func,
  loader: PropTypes.bool,
  getCurrentUser: PropTypes.func,
  kycVerification: PropTypes.func,
  editedBeneficiary: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(BenificiaryList));
