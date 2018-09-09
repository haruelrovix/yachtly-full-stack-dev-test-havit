class User {
  constructor(user = {}) {
    this.id = user.id || '';
    this.name = user.name || '';
    this.email = user.email || '';
    this.phoneNumber = user.phoneNumber || '';
    this.address = user.address || '';
  }
}

export default User;
