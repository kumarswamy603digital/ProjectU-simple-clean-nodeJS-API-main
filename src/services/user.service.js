import userDao from '../models/persistence/user.dao.js';

/**

* Get all users.
  */
  const getAllUsers = () => {
  return userDao.getAll();
  };

/**

* Get a user by ID.
  */
  const getUser = (userId) => {
  return userDao.get(userId);
  };

/**

* Update a user.
  */
  const updateUser = (userId, details) => {
  return userDao.update(userId, details);
  };

/**

* Add a user.
  */
  const addUser = (details) => {
  return userDao.insert(details);
  };

/**

* Remove a user.
  */
  const removeUser = (userId) => {
  return userDao.remove(userId);
  };

export default {
getUser,
getAllUsers,
updateUser,
addUser,
removeUser
};
