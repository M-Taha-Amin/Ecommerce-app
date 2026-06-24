const ApiResponse = require('../utils/apiResponse');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    // req.validatedDto will optionally have excludeSelf flag
    const users = await this.userService.getAllUsers(
      req.user._id,
      req.validatedDto,
    );
    return ApiResponse.success(res, 'Users fetched', users);
  };

  getUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await this.userService.getUser(userId);
    return ApiResponse.success(res, 'User fetched', user);
  };

  updatePassword = async (req, res) => {
    await this.userService.updatePassword(req.user.email, req.validatedDto);
    return ApiResponse.success(res, 'Password Updated');
  };

  updateProfile = async (req, res) => {
    const updatedUser = await this.userService.updateProfile(
      req.user._id,
      req.validatedDto,
    );
    return ApiResponse.success(res, 'Profile Updated', updatedUser);
  };

  updateUserRole = async (req, res) => {
    const updatedUser = await this.userService.updateRole(
      req.params.id,
      req.validatedDto,
    );
    return ApiResponse.success(res, 'Role Updated', updatedUser);
  };

  deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    await this.userService.deleteUser(userId);
    return ApiResponse.noContent(res, 'User Deleted');
  };
}

module.exports = UserController;
