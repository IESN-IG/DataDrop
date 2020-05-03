class Email {
  firstname;
  lastname;
  emails = [];

  constructor(firstname, lastname, ...emails) {
    if (String.isNullOrWhiteSpace(firstname)) throw new Error('firstname cannot be null, empty, or only contain whitespaces');
    if (String.isNullOrWhiteSpace(lastname)) throw new Error('firstname cannot be null, empty, or only contain whitespaces');
    if (!emails || emails.length == 0) throw new Error('you must provide at least one email!');

    this.firstname = firstname;
    this.lastname = lastname;
    this.emails = emails;
  }

  addEmails(...emails) {
    if (!emails || emails.length == 0) throw new Error('you must provide at least one email!');
    for (let i = 0; i < emails.length; i++) 
      this.addEmail(emails[i]);
  }

  addEmail(email) {
    if (String.isNullOrWhiteSpace(email)) throw new Error('email cannot be null, empty, or only contain whitespaces')
    if (!this.emails.includes(email))
      this.emails.push(email);
  }

  removeEmail(email) {
    const index = this.emails.indexOf(email);
    if (index != -1)
      this.emails.splice(index, 1);
  }
}

module.exports = Email;
