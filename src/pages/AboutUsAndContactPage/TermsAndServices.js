import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../../containers/layout/Header";

import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";

class TermsAndServices extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container className="static-content">
            <Row>
              <Col className="mt-5">
                <h2 className="sub-title">Transfa Pay Terms and Conditions</h2>
                <p>
                  This Terms and Conditions is effective as of August 31, 2020,
                  and was most recently updated on August 31, 2020. It describes
                  the terms by which you will be bound when you use the services
                  accessible at{" "}
                  <a href="www.transfapay.com" target="_blank">
                    www.transfapay.com
                  </a>{" "}
                  ("Service"). Do not use the Service if you do not agree to be
                  bound by these terms. By using the Service, you are agreeing
                  to the Terms and Conditions of this Agreement.
                </p>
                <p>
                  As used throughout this Agreement, the terms{" "}
                  <b>"Transfa Pay", "we", "us",</b> and <b>"our"</b> refer to
                  Transfa Pay Ltd, and its partners, together with its
                  employees, directors, successors, and assignees. The terms{" "}
                  <b>"you"</b> and <b>"your"</b> refer to users of the Service,
                  whether as Senders or Recipients.
                </p>
                <h3 className="subhead-title mt-4">1. THE SERVICE</h3>
                <p>
                  We recommend you use the Service to send money to friends and
                  family and, therefore, you should not use the Service to send
                  money to strangers.
                </p>
                <p>
                  The Service allows users to send international money transfers
                  from the United States to other countries served by us. A{" "}
                  <b>"Sender"</b> uses the Service to send money and a{" "}
                  <b>"Recipient"</b> receives money through the Service. A{" "}
                  <b>"Transaction"</b> refers to an order to send money through
                  the Service. The <b>"Transaction Amount"</b> is the amount in
                  US dollars that the Sender provides to Transfa Pay for
                  transmittal to the Recipient. The <b>"Payout Amount"</b> is
                  the amount paid out to the Recipient.
                </p>
                <h3 className="subhead-title mt-4">
                  2. ELIGIBILITY FOR THE SERVICE
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Age and Capacity.</b> You must be at least eighteen
                      (18) years old to create an account, access, or use the
                      Service as a Sender. You must be able to form legally
                      binding contracts under applicable law. Other restrictions
                      may apply.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Others.</b> You may not submit or receive a Transaction
                      on behalf of any other person.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Residence within the United States.</b> The Service is
                      available to residents of the United States only.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Offer and Acceptance.</b> If you submit a Transaction,
                      you are requesting that we process your Transaction, an
                      offer that we may accept or reject at our sole discretion.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Registered in the U.S.A. Only</b> The Service is not
                      licensed to provide the Service outside of the United
                      States of America. As a result, the Service may not be
                      available for use in countries other than the United
                      States.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Multiple Accounts.</b> Senders may only have one active
                      account. If we determine that a Sender is using multiple
                      accounts, we reserve the right to merge or terminate one
                      or more of the accounts, limit the Sender's use of the
                      Service, or refuse their continued use of the Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      When you sign-up for the service, you shall agree to the
                      Terms of Service and Privacy Policy of our partners which
                      shall govern your use of the Service and our operations in
                      providing the Service.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  3. PAYING FOR THE SERVICE
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Charges.</b> With each Transaction you submit you are
                      agreeing to pay us a service fee ("Service Fee"), in
                      addition to the Transaction Amount. Payment in US dollars
                      is due at the time the transaction is submitted for
                      processing. If you submit a transaction that results in us
                      being charged NSF fees, chargeback fees, or other similar
                      costs, you agree to reimburse Transfa Pay for all such
                      fees.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Payment.</b> In order for us to process your
                      transaction you authorize us to charge any of the payment
                      instruments included in your payment profile ("Payment
                      Instrument" includes any debit card, or bank account). If
                      your payment fails you authorize us to re-try one or more
                      times using the same Payment Instrument. You warrant that
                      you are an authorized and lawful user of the Payment
                      Instrument(s).
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Other Charges.</b> We are not responsible for fees that
                      may be imposed by financial institutions associated with
                      your Payment Instruments. For example, debit card issuers
                      may impose additional fees for the transaction. We are not
                      responsible for any NSF fees, chargeback fees, or other,
                      similar charges that might be imposed on you by your bank,
                      credit card issuer, or other provider.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  4. RECEIVING A REMITTANCE
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Service Providers.</b> We work with local banks and
                      other third-party outlets (each, a{" "}
                      <b>"Service Provider"</b>) to make funds available to
                      Recipients. As a Sender, you are appointing your Recipient
                      as your agent for the purpose of receiving funds
                      transmitted through the Service. We try to provide current
                      information on our website about the location,
                      availability, and hours of our Service Providers. However,
                      we are not responsible for any inaccurate or incomplete
                      information that may be posted on the website.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Verification.</b> Recipients may be required to prove
                      their identities before receiving funds by presenting
                      valid identification. Also, Recipients may be required to
                      provide a reference number or another similar identifier
                      associated with their Transactions.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  5. IMPORTANT SERVICE RESTRICTIONS
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>General.</b> We may refuse any Transaction or limit the
                      amount to be transferred, either on a per transaction or
                      aggregated basis. These limits may be imposed on
                      individual accounts or linked accounts. We reserve the
                      right at any time to modify or discontinue all or any part
                      of the Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Delays.</b> Your Transaction may be delayed by our
                      effort to verify your identity and validate your Payment
                      Instruments and otherwise comply with laws or manage our
                      financial risk. You may be entitled to a refund in certain
                      circumstances and you may cancel your transaction at any
                      time while it is pending.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Commercial Transactions.</b> You should not use the
                      Service to send money except to people that you know. We
                      are not responsible for, the quality or delivery of goods
                      or services that you pay for using the Service. You accept
                      that using the Service to pay for goods and services is at
                      your own risk.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Unauthorized Transactions.</b> You may not use the
                      Service in violation of this Agreement, the Terms of
                      Service and Privacy Policy of our partners or applicable
                      laws, rules or regulations. It is a violation of the
                      Agreement to use the Service for any of the following:
                      sexually-oriented materials or services,{" "}
                      <b>gambling activities</b>, fraud, money-laundering, the
                      funding of terrorist organizations, or the purchase or
                      sale of tobacco, tobacco related paraphernalia, firearms,
                      prescription drugs, or other controlled substances; or to
                      send money to a Recipient that is in violation of the
                      above. If you use the Service in connection with illegal
                      conduct, we will report you to law enforcement.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Ineligibility.</b> Your Payment Instrument must be
                      issued by a U.S. financial institution. We may refuse
                      Transactions from certain Senders and to certain
                      Recipients that are included on the Specially Designated
                      Nationals list, Non-cooperative Countries and Territories
                      list, and such other lists as issued by different
                      government agencies.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>No Changes.</b> We generally do not let you change the
                      details of your Transaction once it's submitted to us for
                      processing. It is your responsibility to make sure your
                      Transaction details are accurate.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Restricted Activities.</b> In connection with your use
                      of our website or the Service, or in the course of your
                      interactions with Transfa Pay or our partners, a user or a
                      third party, you will not:{" "}
                    </p>
                    <ul>
                      <li>
                        <p>
                          Breach this Agreement, or any other agreement between
                          you and Transfa Pay or its partners
                        </p>
                      </li>
                      <li>
                        <p>
                          Provide false, inaccurate, or misleading information;
                        </p>
                      </li>
                      <li>
                        <p>
                          Refuse to cooperate in an investigation or provide
                          confirmation of your identity;{" "}
                        </p>
                      </li>
                      <li>
                        <p>Use an anonymizing proxy;</p>
                      </li>
                      <li>
                        <p>
                          Provide yourself a cash advance from your credit card
                          (or help others to do so);
                        </p>
                      </li>
                      <li>
                        <p>
                          Use any automatic device, or manual process to monitor
                          or copy our website.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <b>Transactions to India.</b> Transfa Pay processes
                      transactions to India pursuant to the Rupee Drawing
                      Arrangements ("RDA"), as established by the Reserve Bank
                      of India. You understand that use of the Service for
                      commercial purposes or contributions to charitable
                      organizations is prohibited.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  6. HOW AND WHY WE COLLECT PERSONAL INFORMATION
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Privacy Policy.</b> By agreeing to this Agreement, you
                      acknowledge and consent to Transfa Pay’s Privacy Policy.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Customer Identification Program.</b> U.S. law requires
                      we obtain, verify, and record information about you. We
                      may require that you provide us with nonpublic, personal,
                      identifying information. We may also lawfully obtain
                      information about you from other sources without your
                      knowledge, including non-personal identifying information
                      that we may obtain while you visit this website. Please
                      see our Privacy Policy.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Government Disclosures.</b> We may provide information
                      about you and your Transactions to government authorities
                      and law enforcement agencies, as described in our Privacy
                      Policy.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Verifying information.</b> You authorize us to make any
                      inquiries, to you or to others, which are necessary to
                      validate the information that you provide to us. This may
                      include asking you for additional information, requiring
                      you to take steps to confirm ownership of your email
                      address or financial instruments, verifying your
                      information against third party databases, or through
                      other sources.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  7. ERROR RESOLUTION, CANCELLATIONS AND REFUNDS
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Error Resolution.</b> Let us know at any time if you
                      have any problems with the Service. You can contact us
                      using the contact information at the bottom of this
                      Agreement. For more information about{" "}
                      <b>error resolution</b>, please contact us{" "}
                      <a href="mailto:hello@transfapay.com">
                        hello@transfapay.com
                      </a>
                      .
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Refunds.</b> You can cancel your transaction at any
                      time prior to its completion. Completion means that your
                      recipient claimed the money you sent either through cash
                      pick-up, home delivery, or bank account deposit. Upon
                      receipt of a cancellation request, we may confirm with our
                      Service Providers to determine whether the transaction has
                      been completed prior to initiating a refund.
                    </p>
                    <p>
                      The Transaction Amount will not be refunded after
                      completion.{" "}
                      <b>
                        If, however, you are not satisfied with our service for
                        any reason we will always refund the fee amount.
                      </b>{" "}
                      All refunds will be credited to the same Payment
                      Instrument used to pay for the Transaction. Refunds are
                      only made in U.S. dollars and will not be adjusted to
                      account for changes in the value of the U.S. dollar or
                      foreign currency from the time your Transaction was
                      submitted.{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Complaints.</b> Although we encourage you to share with
                      us any concerns or questions you may have about our
                      service, including your account or a specific transaction,
                      you may also want to contact the money transmitter
                      licensing authority in your state.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">
                  8. TRANSFA PAY’S INTELLECTUAL PROPERTY
                </h3>
                <p>
                  You acknowledge that the Service, including the content of
                  this website, text, graphics, logos, and images, as well as
                  all other Transfa Pay copyrights, trademarks, logos, and
                  product and service names are owned exclusively by Transfa Pay
                  Ltd(the <b>"Transfa Pay Intellectual Property"</b>).
                </p>
                <p>
                  You agree not to display, use, copy, or modify the Transfa Pay
                  Intellectual Property in any manner. You are authorized solely
                  to view and retain a copy of the pages of this website for
                  your own personal, non-commercial use. You further agree not
                  to: (i) use any robot, spider, scraper or other automated
                  device to access the Service; (ii) remove or alter any author,
                  trademark or other proprietary notice or legend displayed on
                  this website (or printed pages thereof); or (iii) infringe
                  Transfa Pay's or any third party's copyright, patent,
                  trademark, trade secret or other intellectual property rights,
                  or rights of publicity or privacy.
                </p>
                <h3 className="subhead-title mt-4">
                  9. DISCLAIMER OF WARRANTIES
                </h3>
                <p>
                  We make reasonable efforts to ensure that Transactions are
                  processed in a timely manner, but we make no representations
                  or warranties regarding the time needed to complete processing
                  because the Service is dependent on many factors outside our
                  control. Some jurisdictions do not allow the disclaimer of
                  implied warranties, so the foregoing disclaimer may not apply
                  to you. This warranty gives you specific legal rights and you
                  may also have other legal rights that vary state to state. In
                  any event, you may have a right to a refund as expressly
                  described herein.
                </p>
                <h3 className="subhead-title mt-4">10. INDEMNITY</h3>
                <p>
                  You agree to indemnify and hold Transfa Pay, Service
                  Providers, and their respective subsidiaries, officers,
                  agents, partners, and employees harmless from any claim or
                  demand, including reasonable attorneys' fees, made by any
                  third party due to or arising out of your use of the Service,
                  your connection to the Service, your violation of the
                  Agreement, or your violation of any rights of another.
                </p>
                <h3 className="subhead-title mt-4">
                  11. LIMITATION OF LIABILITY
                </h3>
                <p>
                  IN NO EVENT SHALL TRANSFA PAY, SERVICE PROVIDERS, OR THEIR
                  RESPECTIVE SUBSIDIARIES, OFFICERS, AGENTS, PARTNERS, OR
                  EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES BEYOND THE SUM OF
                  $500.00 (IN ADDITION TO REFUNDING THE TRANSACTION AMOUNT AND
                  SERVICE FEES), INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS
                  OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES
                  (EVEN IF TRANSFA PAY HAS BEEN ADVISED OF THE POSSIBILITY OF
                  SUCH DAMAGES) RESULTING FROM NEGLIGENCE ON THE PART OF TRANSFA
                  PAY, DISBURSEMENT PARTNERS, OR THEIR RESPECTIVE SUBSIDIARIES,
                  OFFICERS, AGENTS, PARTNERS, OR EMPLOYEES.
                </p>
                <h3 className="subhead-title mt-4">
                  12. DISPUTE RESOLUTION AND GOVERNING LAW
                </h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>Governing Law.</b> This Agreement shall be governed
                      according to the laws of the State of Delaware, and all
                      activities performed in connection with the Service shall
                      be deemed to have been performed in Delaware. Any
                      controversy, dispute, or claim arising out of or relating
                      to the Service or Agreement (a "Claim") shall be governed
                      by and construed in accordance with the laws of
                      Washington, except that body of law governing conflicts of
                      law.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Disputes with Transfa Pay.</b> If a dispute arises
                      between you and Transfa Pay, our goal is to learn about
                      and address your concerns. If we are unable to address
                      your concerns to your satisfaction, we will seek to
                      provide you with a neutral and cost-effective means of
                      resolving the dispute quickly. Disputes between you and
                      Transfa Pay regarding the Service may be reported online
                      to Customer Service via email at support@......com
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Arbitration.</b> You and Transfa Pay agree that any
                      Claim will be settled by binding arbitration, except that
                      each party retains the right to bring an individual action
                      in small claims court. If a party elects’ arbitration,
                      that party will initiate such arbitration through an
                      established alternative dispute resolution (ADR) provider
                      mutually agreed upon by the parties. The ADR provider and
                      the parties must comply with the following rules: (a) the
                      arbitration shall be conducted by telephone, online and/or
                      be solely based on written submissions, the specific
                      manner shall be chosen by the party initiating the
                      arbitration; (b) the arbitration shall not involve any
                      personal appearance by the parties or witnesses unless
                      otherwise mutually agreed by the parties; (c) the
                      arbitrator may not consolidate more than one person's
                      claims, and may not otherwise preside over any form of any
                      class or representative proceeding; and (d) any judgment
                      on the award rendered by the arbitrator may be entered in
                      any court of competent jurisdiction.{" "}
                      <b>
                        You acknowledge and agree that you and Transfa Pay are
                        each waiving the right to a trial by jury or to
                        participate as a plaintiff or class member in any
                        purported class action or representative proceeding.
                      </b>
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Costs and Fees.</b> If your claim does not seek an
                      award of more than $75,000, Transfa Pay will pay the fees
                      associated with arbitration unless the arbitrator finds
                      that either the substance of your Claim or the relief
                      sought to be frivolous or brought for an improper purpose.
                      If you prevail in arbitration you may be entitled to an
                      award of attorneys' fees and expenses, to the extent
                      provided under applicable law. Transfa Pay will not seek,
                      and hereby waives all rights it may have under applicable
                      law to recover, attorneys' fees and expenses if it
                      prevails in arbitration unless the arbitrator finds that
                      either the substance of your Claim or the relief sought to
                      be frivolous or brought for an improper purpose.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Forum for Disputes.</b> Except as otherwise agreed by
                      the parties or as described in section 12(c) above, you
                      agree that any claim or dispute you may have against
                      Transfa Pay must be resolved by a court located in Kent
                      County, Delaware. You agree to submit to the personal
                      jurisdiction of the courts located within Kent County,
                      Delaware for the purpose of litigating all such claims or
                      disputes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Improperly Filed Litigation.</b> All claims you bring
                      against Transfa Pay must be resolved in accordance with
                      section 12 of this Agreement. All claims filed or brought
                      contrary to section 12 shall be considered improperly
                      filed, and a breach of this Agreement.
                    </p>
                  </li>
                </ul>
                <p>
                  Should you file a claim contrary to section 12, Transfa Pay
                  may recover attorneys' fees and costs (including in-house
                  attorneys and paralegals) up to $1,000.00 USD, provided that
                  Transfa Pay has notified you in writing of the improperly
                  filed claim, and you have failed to promptly withdraw the
                  claim.
                </p>
                <h3 className="subhead-title mt-4">13. COMMUNICATIONS</h3>
                <p>
                  <b>
                    You acknowledge that this Agreement shall be entered into
                    electronically,
                  </b>{" "}
                  and that the following categories of information{" "}
                  <b>("Communications")</b> may be provided by electronic means:
                  (i) this Agreement and any amendments, modifications or
                  supplements to it; (ii) your records of transactions through
                  the Service; (iii) any initial, periodic or other disclosures
                  or notices provided in connection with the Service, including
                  without limitation those required by federal or state law;
                  (iv) any customer service communications, including without
                  limitation communications with respect to claims of error or
                  unauthorized use of the Service; (v) any other communication
                  related to the Service or Transfa Pay.
                </p>
                <p>
                  Communications may be provided to you through the use of
                  autodialed or prerecorded message calls or text messages at
                  the telephone number(s) that you provide us with. We may
                  contact you directly or we may share your phone number with
                  service providers with whom we contract to provide such
                  Communications. Standard telephone minute and text charges may
                  apply. The hardware and software requirements for access to
                  and retention of the Communications associated with the
                  Service include a personal computer or other device which is
                  capable of accessing the Internet; an Internet Web Browser;
                  and a printer or other device capable of printing and/or
                  retaining agreements and documents.
                </p>
                <p>
                  The Service does not allow for Communications to be provided
                  in paper format or through other non-electronic means. You may
                  withdraw your consent to receive Communications
                  electronically, but if you do, your use of the Service shall
                  be terminated. In order to withdraw your consent, you must
                  contact us using our contact information at the end of this
                  Agreement.
                </p>
                <h3 className="subhead-title mt-4">14. MISCELLANEOUS</h3>
                <ul className="point-list">
                  <li>
                    <p>
                      <b>PCI-DSS Compliance.</b> Transfa Pay is compliant and
                      shall remain compliant with the Payment Card Industry
                      (“PCI”) Data Security Standards to the extent we possess
                      or otherwise store, process, or transmit your Payment
                      Instrument data or other data subject to PCI obligations.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Entire Agreement.</b> The Agreement constitutes the
                      entire agreement between you and Transfa Pay and governs
                      your use of the Service, superseding any prior agreements
                      between you and Transfa Pay. However, when you accept the
                      Terms of Service and Privacy Policy of our partners upon
                      sign-up, the provisions of that Terms of Service and
                      Privacy Policy shall supercede this Agreement in case of
                      any conflict.{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>No Waiver.</b> The failure of Transfa Pay to exercise
                      or enforce any right or provision of the Agreement shall
                      not constitute a waiver of such right or provision. If any
                      provision of the Agreement is found by an arbitrator or
                      court of competent jurisdiction to be invalid, the parties
                      nevertheless agree that the arbitrator or court should
                      endeavor to give appropriately valid effect to the
                      intention of the Agreement as reflected in the provision,
                      and the other provisions of the Agreement shall remain in
                      full force and effect.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Force Majeure.</b> We shall not be liable for any
                      failure or delay in the performance of the Service to the
                      extent such failure or delay is caused by matters beyond
                      our reasonable control, including, without limitation:
                      changes in applicable laws; closure or unavailability of
                      required physical and network infrastructure; sovereign
                      default; power or internet failure; civil unrest; war; and
                      earthquake, fire, flood, or other natural disasters.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Modification.</b> We may modify this Agreement from
                      time to time without notice to you, except as may be
                      required by law. You can review the most current version
                      of the Agreement at any time by reviewing this website.
                      You may terminate your use of the Service if you do not
                      agree with any modification or amendment. If you use the
                      Service after the effective date of an amendment or
                      modification, you shall be deemed to have accepted that
                      amendment or modification. You agree that you shall not
                      modify this Agreement and acknowledge that any attempts by
                      you to modify this Agreement shall be void.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Other Terms.</b> This Agreement may be supplemented by
                      terms applicable to other promotions, our Referral
                      Program, and other terms applicable to you based upon your
                      use of the Service. These terms are incorporated into this
                      Agreement by reference. To the extent that any of these
                      terms are determined to be in conflict with this
                      Agreement, this Agreement shall control.
                    </p>
                  </li>
                </ul>
                <h3 className="subhead-title mt-4">15. SECURITY</h3>
                <p>
                  Your security is very important to Transfa Pay, and we use a
                  variety of security measures to make sure that your
                  information is secure. We urge you to think carefully before
                  sending money to anyone that you do not know well. In
                  particular, you should be cautious of deals or offers that
                  seem too good to be true. If you think you have been or might
                  be a victim of fraud, please contact us immediately by
                  telephone at +23276131089
                </p>
                <p>
                  If you are aware of anyone or any entity that is using the
                  Service inappropriately, please email us at{" "}
                  <a href="mailto:hello@transfapay.com">hello@transfapay.com</a>
                  . If you receive any fake (phishing) emails, purporting to be
                  from Transfa Pay, please forward them to us at{" "}
                  <a href="mailto:hello@transfapay.com">hello@transfapay.com</a>
                  .
                </p>
                <h3 className="subhead-title mt-4">16. CONTACT INFORMATION</h3>
                <p>
                  Questions, notifications, and requests for refunds or further
                  information can be sent to Transfa Pay, as follows by
                  telephone at +1 205 557 3200 (USA) or +232 75 168817 (Sierra
                  Leone).
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

export default connect(mapStateToProps)(TermsAndServices);
