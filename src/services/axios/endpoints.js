const endpoints = {
  /**
   * Success response refers to user's existence
   * 400 means user not found, later we can use email
   *
   * Get method Query:
   * @phoneNumber
   * @email
   */
  checkUserExistence: "/auth/users/exists",

  /**
   * endpoints for mobile number verification
   * Get method Query:
   * @phoneNumber
   * @countryCode
   *
   * Post Method: {code ,userId}
   */
  verifyMobile: "/auth/verify/mobile",

  /**
   * Get method Query:
   * @email
   * @userId
   *
   * Post Method: {code ,userId}
   */
  verifyEmail: "/auth/verify/email",

  /**
   * POST Method : { userId, firstName, lastName, state, Password}
   */
  registerUser: "auth/users",

  /**
   * login
   */
  loginUser: "auth/login",
  refreshToken: "/auth/renewtoken",
  // getUserDetails: "/senders",
  getUserDetails: "/auth/users",
  password: "/auth/password",

  // transactions endpoints
  transactionsLimit: "/transactions/limit",
  /**
   * Get method: to fetch all transactions
   * Post Method: to create transactions
   * delete method: /{@id}
   */
  transactions: "/transactions",
  adminTransactions: "/transactions",

  // mics
  getAllCountries: "/countries",
  exchangeRate: "/exchange-rates",
  widgetToken: "/widgets/token",
  getAllBankForCountry: "/banks", //{@id}
  getAllParyersForCountry: "/payers/", //{@3charCountryCode}
  getFee: "/fees",
  states: "/states",

  // Beneficiary
  /**
   * Get method: to fetch all beneficiaries
   * Post Method: to create new beneficiaries
   *
   * for Beneficiary Bank
   * POST METHOD: senders/beneficiaries/{{ beneficiaryId }}/banks
   * GET METHOD: senders/beneficiaries/{{ beneficiaryId }}/banks
   */
  beneficiary: "/senders/beneficiaries",

  // senders endpoitss
  /**
   * Get method: to get all sender banks
   * Delete Method: /{@id}
   */
  senderBanks: "/senders/banks",
  /**
   * Get method: to fetch all sender cards
   * Delete Method: to delete cards /{@id}
   */
  senderCards: "/senders/cards",

  /**
   * Post Method : to add the fees structure
   * Put Method : to update the fees structure
   */

  feeStructure: "/fees",

  /**
   *  /senders/locked - GET
      /senders/{senderId}/unlock - POST
   */

  lockedSender: `/users/locked`,

  unlockLockedSender: "/users",
};

export default endpoints;
