const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const createUser = async (userData, profilePath = '') => {
  const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const user = new User({
    ...userData,
    profile: profilePath,
  });
  return user.save();
};

const updateUser = async (userId, userData, profilePath = null) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (userData.email && userData.email.toLowerCase() !== user.email) {
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }
  }

  Object.assign(user, userData);
  if (profilePath !== null) {
    user.profile = profilePath;
  }
  return user.save();
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const getUsers = async (page = 1, limit = 8, search = '') => {
  const skip = (page - 1) * limit;
  const query = {};

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
      { mobile: searchRegex },
      { location: searchRegex },
    ];
  }

  const [users, totalCount] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    users,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const searchUsers = async (searchTerm, page = 1, limit = 10) => {
  return getUsers(page, limit, searchTerm);
};

const getAllUsersForExport = async () => {
  return User.find({}).sort({ createdAt: -1 }).lean();
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUsers,
  getAllUsersForExport,
};
