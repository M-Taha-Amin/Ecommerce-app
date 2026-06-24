const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  validateUpdatePassword,
  validateUpdateProfile,
  validateQueryParams,
  validateUpdateRole,
} = require('../middlewares/userValidation');
const { isAuthenticated, isAdmin } = require('../middlewares/authValidation');
const { validateID } = require('../middlewares/validateMongodbID');
const { userController } = require('../container');

const router = express.Router();

// Route for a user to update their profile except password
router
  .route('/users/me')
  .patch(
    isAuthenticated,
    validateUpdateProfile,
    asyncHandler(userController.updateProfile),
  );
// Route for a user to update their password
router
  .route('/users/me/password')
  .patch(
    isAuthenticated,
    validateUpdatePassword,
    asyncHandler(userController.updatePassword),
  );
// Route for Admin to get list of all users
router.route('/users').get(
  // checks if excludeSelf flag is Boolean if passed
  validateQueryParams,
  isAuthenticated,
  isAdmin,
  asyncHandler(userController.getAllUsers),
);
// Route for Admin to get single user details and delete a user
router
  .route('/users/:id')
  .all(validateID, isAuthenticated, isAdmin)
  .get(asyncHandler(userController.getUser))
  .delete(asyncHandler(userController.deleteUser));

// Route for Admin to update role of a user
router
  .route('/users/:id/role')
  .patch(
    validateID,
    isAuthenticated,
    isAdmin,
    validateUpdateRole,
    asyncHandler(userController.updateUserRole),
  );


module.exports = router;