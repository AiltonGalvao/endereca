function checkIfOrganizationEmail(email) {
  var regExp = new RegExp("/*@semed.manaus.am.gov.br$", "i");
  return email.match(regExp);
}

export default checkIfOrganizationEmail;