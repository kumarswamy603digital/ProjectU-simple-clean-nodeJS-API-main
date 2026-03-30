import { StatusCodes } from 'http-status-codes';
import pino from 'pino';
import userService from '../services/user.service.js';

const logger = pino();

const STATUS = {
success: true,
failure: false
};

// Get all users
const getAllUsers = (req, res) => {
const users = userService.getAllUsers();

```
if (users && users.length) {
    return res.status(StatusCodes.OK).send(users);
}

return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: 'No users found.',
});
```

};

// Get single user
const getUser = (req, res) => {
const id = parseInt(req.params.id, 10);
const user = userService.getUser(id);

```
if (user) {
    logger.info(`Retrieving user ID ${id}`);

    return res.status(StatusCodes.OK).send(user);
}

return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: `User ${id} is not found.`,
});
```

};

// Add user
const addUser = (req, res) => {
const user = req.body;

```
const addedUser = userService.addUser(user);

logger.info('Creating a user');

return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
});
```

};

// Update user
const updateUser = (req, res) => {
const user = req.body;
const id = parseInt(req.params.id, 10);

```
const updatedUser = userService.updateUser(id, user);

if (updatedUser) {
    logger.info(`Updating user ID ${id}`);

    return res.status(StatusCodes.OK).send({
        status: STATUS.success,
        user: updatedUser,
    });
}

return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: `User ${id} is not found.`,
});
```

};

// Delete user
const removeUser = (req, res) => {
const id = parseInt(req.params.id, 10);
const user = userService.getUser(id);

```
if (user) {
    userService.removeUser(id);

    logger.info(`Removing user ID ${id}`);

    return res.status(StatusCodes.OK).send({
        status: STATUS.success,
        message: `User ${id} has been deleted.`,
    });
}

return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: `User ${id} hasn't been found.`,
});
```

};

export default {
getAllUsers,
getUser,
addUser,
updateUser,
removeUser
};
