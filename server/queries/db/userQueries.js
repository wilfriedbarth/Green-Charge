const User = require('../../models/User');

module.exports = {
  fetchUsers() {
    return User.find().exec();
  },
  fetchUser(id) {
    return User.findById(id).exec();
  },
  createUser(props) {
    return User.create(props);
  },
  updateUser(id, props) {
    return User.findByIdAndUpdate(id, props).exec();
  },
  deleteUser(id) {
    return User.findByIdAndRemove(id).exec();
  }
};
