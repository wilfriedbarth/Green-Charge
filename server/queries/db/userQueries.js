const User = require('../../models/User');

module.exports = {
  fetchUsers() {
    return User.find().exec();
  },
  fetchUser(id) {
    return User.findById(id).exec();
  },
  createUser({ email, password }) {
    return User.create({ email, password });
  },
  updateUser(id, { email, password }) {
    return User.findByIdAndUpdate(id, { email, password }).exec();
  },
  deleteUser(id) {
    return User.findByIdAndRemove(id).exec();
  }
};
