import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../../containers/layout/Header";
import { connect } from "react-redux";

import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

class CopyRight extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container className="static-content">
            <Row>
              <Col className="mt-5">
                <h2 className="sub-title">Copyright Notice</h2>
                <p>
                  All files and information contained in this Website or Blog
                  located at http://www.transfapay.com are copyright by Transfa
                  Pay Ltd, and may not be duplicated, copied, modified or
                  adapted, in any way without our written permission. Our
                  Website or Blog may contain our service marks or trademarks as
                  well as those of our affiliates or other companies, in the
                  form of words, graphics, and logos.
                </p>
                <p>
                  Your use of our Website, Blog or Services does not constitute
                  any right or license for you to use our service marks or
                  trademarks, without the prior written permission of Transfa
                  Pay Ltd.
                </p>
                <p>
                  Our Content, as found within our Website, Blog and Services,
                  is protected under local and foreign copyrights. The copying,
                  redistribution, use or publication by you of any such Content,
                  is strictly prohibited. Your use of our Website and Services
                  does not grant you any ownership rights to our Content.
                </p>
                <h3 className="subhead-title mt-4">Enforcement of copyright</h3>
                <p>
                  Transfa Pay Ltd takes the protection of its copyright very
                  seriously.
                </p>
                <p>
                  If Transfa Pay Ltd discovers that you have used its copyright
                  materials in contravention of the license above, Transfa Pay
                  Ltd may bring legal proceedings against you seeking monetary
                  damages and an injunction to stop you using those materials.
                  You could also be ordered to pay legal costs.
                </p>
                <p>
                  If you become aware of any use of Transfa Pay Ltd’s copyright
                  materials that contravenes or may contravene the license
                  above, please report this to us immediately.
                </p>
                <p>Copyright © Transfa Pay Ltd 2020 All Rights Reserved</p>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(CopyRight);
