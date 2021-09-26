import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../../containers/layout/Header";

import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";

class PrivacyPolicy extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container className="static-content">
            <Row>
              <Col className="mt-5">
                <h2 className="sub-title">Transfa Pay's Privacy Policy</h2>
                <p>
                  Transfa Pay Ltd is serious about protecting your privacy. This
                  Privacy Policy ("Policy") covers how Transfa Pay collects and
                  uses the personal information you provide on our website and
                  in conjunction with any of the services hosted at{" "}
                  <a href="www.transfapay.com" target="_blank">
                    www.transfapay.com
                  </a>{" "}
                  (Service" and "Website"), including money transfer services
                  accessed by internet enabled devices. You shall also be
                  required to agree to the Privacy Policy of our partners when
                  you sign-up for the services. These privacy policies describe
                  the choices available to you regarding our use of your
                  personal information and how you can access and update this
                  information. This Policy also applies if you participate in
                  our research projects.
                </p>
                <p>The Policy was last updated on February 15, 2020.</p>
                <p>
                  This Policy explains what personal information we collect
                  about you, with whom we share it, and how you can elect in
                  certain situations to not share information with third
                  parties. "Personal Information" refers to information such as
                  name and email that can be used to identify you individually.
                </p>
                <p>
                  We may amend this Policy at any time, and whenever we do so we
                  will notify you by posting a revised version on the Website.
                  If, however, we plan to make a material change in the way we
                  collect, use, or store your personal information, we will
                  provide prior notice on our website, and by email.
                </p>
                <p>
                  You will then have the chance to decide whether or not we will
                  use or disclose your information in that new manner, whether
                  though an "opt-out" procedure or by sending your relationship
                  with us. Such changes will become effective, at the earliest,
                  30 days after the date of the email notifications.
                </p>
                <p>
                  We ask that minors refrain from using our Service or
                  submitting any personal information to us.
                </p>
                <p>
                  Minors (those under the age of 18 years) are not eligible to
                  use our Service.
                </p>
                <p>
                  If you have questions or concerns regarding this Policy, you
                  should contact us at{" "}
                  <a href="mailto:hello@transfapay.com">hello@transfapay.com</a>
                  .
                </p>
                <h3 className="subhead-title mt-4">Information We Collect</h3>
                <p>
                  We will collect the following information about you, which may
                  include non-public personal information:
                </p>
                <ul className="point-list">
                  <li>
                    <p>
                      Personal and financial Information you give us as a result
                      of using the Service, such as your address, e-mail
                      address, date of birth, telephone number, all or part of
                      your Social Security number, bank account online login
                      information, bank account number, and credit/debit card
                      number. Under certain circumstances we will also collect
                      and save information obtained from scanned copies of
                      official identification documents, including your Passport
                      or Drivers' License.
                    </p>
                  </li>
                  <li>
                    <p>
                      Third party personal information you provide in order for
                      us to facilitate funds transfers, such as your recipient's
                      full name, physical address, email address, and phone
                      number. However, we will not contact your recipients
                      except as instructed by you or as required to complete a
                      transaction. This information is only used for the sole
                      purpose of completing your request or for whatever reason
                      it may have been provided.
                    </p>
                  </li>
                  <li>
                    <p>
                      Information about your usage of the Service, including
                      your transaction history, and how and to whom you use the
                      Service to send or receive money;
                    </p>
                  </li>
                  <li>
                    <p>
                      Information that we lawfully obtain from third parties,
                      such as identity verification services, electronic
                      database services, and credit reporting agencies;
                    </p>
                  </li>
                  <li>
                    <p>
                      Information that we indirectly obtain from you, such as
                      information about the hardware and software you use when
                      accessing the Service, your IP address, and the pages you
                      access on this website, and other websites that you visit
                      prior to accessing the Service.
                    </p>
                  </li>
                </ul>
                <p>
                  Technologies such as: cookies, beacons, tags and scripts are
                  used by Transfa Pay, Inc. and our marketing, analytics and
                  risk partners or affiliates. These technologies are used in
                  analyzing trends, administering the site, tracking users'
                  movements around the site and to gather demographic
                  information about our user base as a whole. We may receive
                  reports based on the use of these technologies by these
                  companies on an individual as well as aggregated basis.
                </p>
                <p>
                  We use cookies for site functionality, remembering user's
                  settings (e.g. source &amp; destination country), and for
                  authentication. Users can control the use of cookies at the
                  individual browser level. If you reject cookies some features
                  or areas of our site will be limited.
                </p>
                <p>
                  As is true of most web sites, we gather certain information
                  automatically and store it in log files.
                </p>
                <p>
                  This information may include internet protocol (IP) addresses,
                  browser type, internet service provider (ISP), referring/exit
                  pages, operating system, date/time stamp, and/or clickstream
                  data.
                </p>
                <p>
                  We may combine this automatically collected log information
                  with other information we collect about you. We do this to
                  improve services we offer you.
                </p>
                <p>
                  We use Local Storage Objects (LSOs) such as HTML5 to store
                  content information and preferences.
                </p>
                <p>
                  Third parties with whom we partner to provide certain features
                  on our site or to display advertising based upon your Web
                  browsing activity use LSOs such as HTML 5 or Flash to collect
                  and store information.
                </p>
                <p>
                  Various browsers may offer their own management tools for
                  removing HTML5 LSOs. To manage Flash LSOs please{" "}
                  <a href="/#" target="_blank">
                    click here
                  </a>
                  .
                </p>
                <p>
                  We partner with a third party to manage our advertising on
                  other sites. Our third-party partner may use technologies such
                  as cookies to gather information about your activities on this
                  site and other sites in order to provide you advertising based
                  upon your browsing activities and interests. If you wish to
                  not have this information used for the purpose of serving you
                  interest-based ads, you may opt-out by{" "}
                  <a href="/#" target="_blank">
                    clicking here
                  </a>
                  . Please note this does not opt you out of being served ads.
                  You will continue to receive generic ads.{" "}
                </p>
                <h3 className="subhead-title mt-4">
                  Why We Collect Information
                </h3>
                <p>
                  We collect Personal and Non-Personal information for the
                  following purposes:
                </p>
                <ul className="point-list">
                  <li>
                    <p>To process your transactions. </p>
                  </li>
                  <li>
                    <p>To verify your identity.</p>
                  </li>
                  <li>
                    <p>To collect payment for your use of the Service.</p>
                  </li>
                  <li>
                    <p>
                      To track, improve and personalize our Services, content
                      and advertising{" "}
                    </p>
                  </li>
                  <li>
                    <p>To troubleshoot problems with the Service.</p>
                  </li>
                  <li>
                    <p>
                      To comply with applicable laws and regulations, such as
                      those relating to "know-your-customer," and anti-money
                      laundering requirements.
                    </p>
                  </li>
                  <li>
                    <p>
                      To detect and prevent fraud and other illegal uses of the
                      Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      To create an account connection between your Transfa Pay
                      account and a third-party account or platform (such as
                      your online bank account);
                    </p>
                  </li>
                  <li>
                    <p>
                      To send you marketing notices, service updates, and
                      promotional offers
                    </p>
                  </li>
                  <li>
                    <p>
                      To collect survey information that will be used to monitor
                      or improve the use of our Service and overall customer
                      satisfaction.
                    </p>
                  </li>
                </ul>
                <p>
                  We will retain your information for as long as your account is
                  active or as needed to provide you Service. We will retain and
                  use your information as necessary to comply with our legal
                  obligations, resolve disputes, and enforce our agreements.
                </p>
                <h3 className="subhead-title mt-4">
                  How We Share Information with Others
                </h3>
                <p>
                  We will share your personal information with third parties
                  only in the ways that are described in this privacy policy. We
                  do not sell or rent the information we collect to third
                  parties for their promotional purposes. These companies are
                  authorized to use your personally identifiable information
                  only as necessary to provide these services to us.
                </p>
                <p>
                  Nevertheless, we may share information about you (including
                  nonpublic, personal information) with:
                </p>
                <ul className="point-list">
                  <li>
                    <p>
                      Third-party service providers under contract with Transfa
                      Pay that help us with our business operations, such as
                      transaction processing, fraud prevention, marketing,
                      market research, and validation of information provided.
                      These third parties are prohibited from using your
                      information for their own separate business purposes.
                    </p>
                  </li>
                  <li>
                    <p>
                      In the event of the sale, acquisition or merger of some or
                      all of our assets, your personal information might be a
                      part of the transferred assets. We shall notify you in the
                      event of such an occurrence, as well as any choices you
                      may have regarding your personal information, by placing a
                      notice on our website.
                    </p>
                  </li>
                  <li>
                    <p>
                      Law enforcement, government officials or other third
                      parties, but only
                    </p>
                    <ul>
                      <li>
                        <p>
                          in connection with a formal request, subpoena, court
                          order, or similar legal procedure; and
                        </p>
                      </li>
                      <li>
                        <p>
                          when we believe in good faith that disclosure is
                          necessary to comply with the law, prevent physical
                          harm or financial loss, report suspected illegal
                          activity, or to investigate violations of our User
                          Agreement.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      Other third parties that you consent or direct, which may
                      include you authorizing an account linking for a
                      third-party service, account and/or platform.
                    </p>
                    <ul>
                      <li>
                        <p>
                          For the purposes of this privacy policy, an "account
                          linking" with such a third party is a connection you
                          authorize or enable between your Transfa Pay account
                          and a non-Transfa Pay account, payment instrument, or
                          platform that you lawfully control or own. When you
                          authorize such a connection, Transfa Pay and the
                          third-party will exchange your personal information
                          and other information directly. Examples of account
                          connections include: connecting your Transfa Pay
                          account to a third-party data aggregation or financial
                          services company, if you provide such company with
                          your account log-in credentials;
                        </p>
                      </li>
                      <li>
                        <p>
                          If you connect your Transfa Pay account to other
                          banking or similar accounts, directly or through a
                          third-party service provider, we may have access to
                          your account balance and account and transactional
                          information, such as purchases and funds transfers. If
                          you choose to create an account linkage, we may
                          receive information from the third-party about you and
                          your use of the third-party’s service. We will use all
                          such information that we receive from a third-party
                          via an account connection in a manner consistent with
                          this privacy policy.
                        </p>
                      </li>
                      <li>
                        <p>
                          Information that we share with a third-party based on
                          an account connection will be used and disclosed in
                          accordance with the third-party’s privacy practices.
                          Before authorizing an account connection, you should
                          review the privacy notice of any third-party that will
                          gain access to your personal information as part of
                          the account connection.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  Access To Your Information
                </h3>
                <p>
                  You can access, modify, delete or update your personal
                  information submitted on our Website by logging into your
                  account and changing your preferences, by emailing our
                  Customer Support at{" "}
                  <a href="mailto:hello@transfapay.com">hello@transfapay.com</a>{" "}
                  or by contacting us by telephone at the contact information
                  listed below. We will respond to your request to access within
                  a reasonable timeframe.
                </p>
                <h3 className="subhead-title mt-4">
                  Retaining your personal information:
                </h3>
                <p>
                  We will only retain your personal information for as long as
                  necessary to fulfil the purposes we collected it for,
                  including for the purposes of satisfying any legal, accounting
                  or reporting requirements. To determine the appropriate
                  retention period for personal information, we consider
                  (amongst other things):
                </p>
                <ul className="point-list">
                  <li>
                    <p>
                      obligations and/or retention periods imposed on us by
                      applicable laws and/or our regulators
                    </p>
                  </li>
                  <li>
                    <p>
                      the amount, nature, and sensitivity of the personal
                      information
                    </p>
                  </li>
                  <li>
                    <p>
                      the potential risk of harm from unauthorized use or
                      disclosure of your personal information, and
                    </p>
                  </li>
                  <li>
                    <p>
                      the purposes for which we process your personal
                      information and whether we can achieve those purposes
                      through other means.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  Notice to Customers who reside in California
                </h3>
                <p>
                  The California Consumer Privacy Act (CCPA) exempts certain
                  nonpublic personal information which is covered by the
                  Gramm-Leach Bliley Act (GLBA), a federal privacy law that
                  applies to financial institutions, like Transfa Pay. What this
                  means is that your nonpublic personal information that you
                  provide to us to obtain our Service, that results from any
                  transaction you make using our Service, or that we otherwise
                  obtain about you in connection with us providing our Service
                  to you (GLBA Personal Information), is not subject to the
                  various requirements set out in the CCPA. We do not collect
                  nonpublic personal information about you that is outside a
                  Transaction or the provision of our Services.
                </p>
                <p>
                  Please be assured that we take the privacy of your GLBA
                  Personal Information very seriously. Your GLBA Personal
                  Information is protected under the GLBA which places certain
                  obligations on us, and affords you certain rights, all of
                  which are set out in this Policy. The rights you have in the
                  event that your non-encrypted or non-redacted GLBA Personal
                  Information is subject to unauthorized access and
                  exfiltration, theft, or disclosure as a result of our failure
                  to implement and maintain reasonable and appropriate security
                  procedures and practices remain.
                </p>
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

export default connect(mapStateToProps)(PrivacyPolicy);
