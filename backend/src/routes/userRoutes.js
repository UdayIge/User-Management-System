const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../config/multer');
const {
  validate,
  createUserRules,
  updateUserRules,
  userIdParamRules,
  paginationRules,
} = require('../validators/userValidator');

const router = express.Router();

router
  .route('/')
  .get(paginationRules, validate, userController.getUsers)
  .post(upload.single('profile'), createUserRules, validate, userController.createUser);

router.get('/export', userController.exportToCsv);

router
  .route('/:id')
  .get(userIdParamRules, validate, userController.getUserById)
  .put(upload.single('profile'), updateUserRules, validate, userController.updateUser)
  .delete(userIdParamRules, validate, userController.deleteUser);

module.exports = router;
