class User {
  constructor(user = {}, timestamps = false) {
    this.id = user.id || '';
    this.name = user.name || '';
    this.email = user.email || '';
    this.phoneNumber = user.phoneNumber || '';
    this.address = user.address || '';

    if (timestamps) {
      this.createdAt = user.createdAt,
      this.updatedAt = user.updatedAt
    }
  }
}

module.exports = User;
