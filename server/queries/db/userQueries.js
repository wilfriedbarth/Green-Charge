const User = require('../../models/User');

module.exports = {
  fetchUsers() {
    return User.find();
  },
  fetchUser(id) {
    return User.findById(id);
  },
  createUser(props) {
    return User.create(props);
  },
  updateUser(id, props) {
    return User.findByIdAndUpdate(id, props);
  },
  deleteUser(id) {
    return User.findByIdAndRemove(id);
  }
};
