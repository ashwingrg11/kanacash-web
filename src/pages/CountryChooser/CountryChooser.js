import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import star from "../../assets/images/star.svg";
import ROUTES from "../../assets/Routes/Routes";
import {
  getDestination,
  getExchangeRate,
  getAllCountries,
} from "../../store/actions/miscellaneousAction";
import PropTypes from "prop-types";

import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import { getTransferFee } from "../../store/actions/TrasactionAction";
import { getSenderTransactionLimit } from "../../store/actions/senderDetail";
import { InputDropdown } from "../../components/CustomDropdown";
import "./CountryChooser.css";
import COLORS from "../../assets/Color/Color";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class CountryChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
      countryList: [],
      error: "",
      loading: true,
      showAlert: false,
      message: "",
      variant: "",
    };
  }

  componentDidMount = () => {
    localStorage.removeItem("signUpFromTransaction");
    this.setState({ loading: true });
    this.props
      .getAllCountries()
      .then((res) => this.setState({ loading: false }));
    // this.props.getDestination({ sourceCountry: "US" });
    // TODO: missing api endpoints
    // this.props.getTransferFee();
    // this.props.getExchangeRate();
    if (localStorage.accessToken) {
      this.props.getSenderTransactionLimit();
    } else {
      // this.props.clearUser();
    }
    let state = this.props.location.resetPasswordSuccess;
    if (
      this.props.location?.resetPasswordSuccess &&
      localStorage.successReset
    ) {
      this.setState(state);
      localStorage.removeItem("successReset");
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.countries !== this.props.countries) {
      const countryList = this.props.countries.filter(
        (item) => item.three_char_code !== "USA"
      );
      this.setState({
        countryList: countryList,
      });
    }
  };

  nextStep = () => {
    if (this.state.selectedCountry) {
      localStorage.setItem(
        "selectedCountry",
        JSON.stringify(this.state.selectedCountry)
      );
      const route = {
        pathname: ROUTES.PAYMENT_DETAIL,
        state: this.state.selectedCountry,
      };
      this.props.history.push(route);
    } else {
      this.setState({ error: "Select country you are sending money to." });
    }
  };

  selectCountry = (value) => {
    this.setState({ selectedCountry: value, error: "" });
  };

  // componentDidMount = () => {
  //   console.log("state", this.props.location);
  //   if (this.props.location?.state) {
  //     let state = this.props.location.state;
  //     this.setState(state);
  //   }
  // };

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="front-background">
          <Container>
            <Row>
              <div className="circle-stroke country-circle">
                <Col>
                  <Row>
                    <Col className="text-center p-0">
                      <h2 className="title">
                        <img src={star} alt="star-icon" className="ml-1" />
                        <span style={{ color: `${COLORS.PRIMARY_COLOR}` }}>
                          {" "}
                          &nbsp; SEND MONEY ANYWHERE &nbsp;{" "}
                        </span>
                        <img src={star} alt="star-icon" className="mr-1" />
                      </h2>
                      <p className="tagline">
                        We make it possible to send money at lowest fees.
                      </p>
                      <div className="calculator">
                        <InputDropdown
                          label={"Send money to"}
                          option={this.state.countryList || []}
                          onClick={() => this.nextStep()}
                          onChangeOption={(value) => this.selectCountry(value)}
                          value={this.state.selectedCountry}
                          loading={this.state.loading}
                        />
                        {this.state.error && (
                          <p
                            style={{ fontSize: ".8rem", width: "100%" }}
                            className="p-2 text-danger mb-1"
                          >
                            {this.state.error}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Container>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
        <CustomAlert
          show={this.state.showAlert}
          message={this.state.message}
          variant={this.state.variant}
          close={() => this.setState({ showAlert: false })}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.miscellaneous.countries,
  acceptPolicy: state.auth.accept_policy,
});

const mapDispatchToProps = {
  getAllCountries,
  getDestination,
  getExchangeRate,
  getTransferFee,
  getSenderTransactionLimit,
};

CountryChooser.propTypes = {
  getDestination: PropTypes.func,
  getTransferFee: PropTypes.func,
  getExchangeRate: PropTypes.func,
  destinationCountry: PropTypes.array,
  history: PropTypes.object,
  getSenderTransactionLimit: PropTypes.func,
  getAllCountries: PropTypes.func,
  countries: PropTypes.array,
  location: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CountryChooser));
