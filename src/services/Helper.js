/**
 * Class Helper, helper.js
 * 
 * All common helper methods which are shared and useful throught this application.
 * 
 */

class Helper {
  // Do not allow user to write more than the defined digits on postal code input
  // todo: the length of postal code should be defined for all possible payout countries
  static verifyPostalCodeLength = (object) => {
    if (object.target.value.length > 6) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  
  // Do not allow user to write more than the defined digits on phone number input
  static verifyPhoneNumLength = (object) => {
    if (object.target.value.length > 10) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
}

export default Helper;


