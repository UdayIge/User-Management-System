const userService = require('../services/userService');
const { successResponse, paginatedResponse, errorResponse } = require('../utils/ApiResponse');
const path = require('path');

const createUser = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    const profilePath = req.file ? `/uploads/profiles/${req.file.filename}` : '';
    const user = await userService.createUser(userData, profilePath);
    return successResponse(res, 201, user, 'User created successfully');
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = { ...req.body };
    const profilePath = req.file ? `/uploads/profiles/${req.file.filename}` : null;
    const user = await userService.updateUser(id, userData, profilePath);
    return successResponse(res, 200, user, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return successResponse(res, 200, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return successResponse(res, 200, user, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const result = await userService.getUsers(page, limit, search);
    return paginatedResponse(
      res,
      200,
      result.users,
      result.pagination,
      'Users fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

const exportToCsv = async (req, res, next) => {
  try {
    const users = await userService.getAllUsersForExport();
    const headers = ['ID', 'First Name', 'Last Name', 'Full Name', 'Email', 'Mobile', 'Gender', 'Status', 'Location', 'Created At'];
    const rows = users.map((u) => [
      u._id.toString(),
      u.firstName,
      u.lastName,
      `${u.firstName} ${u.lastName}`.trim(),
      u.email,
      u.mobile || '',
      u.gender || '',
      u.status || '',
      u.location || '',
      u.createdAt ? new Date(u.createdAt).toISOString() : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=users-export-${Date.now()}.csv`
    );
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  exportToCsv,
};
