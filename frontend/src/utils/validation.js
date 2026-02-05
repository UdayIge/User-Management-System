const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email?.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value?.toString().trim()) return `${fieldName} is required`;
  return '';
};

export const validateMaxLength = (value, max, fieldName) => {
  if (value && value.length > max) return `${fieldName} cannot exceed ${max} characters`;
  return '';
};

export const validateUserForm = (formData) => {
  const errors = {};

  const firstNameError = validateRequired(formData.firstName, 'First name') ||
    validateMaxLength(formData.firstName, 50, 'First name');
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateRequired(formData.lastName, 'Last name') ||
    validateMaxLength(formData.lastName, 50, 'Last name');
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  if (formData.mobile && formData.mobile.length > 20) {
    errors.mobile = 'Mobile number cannot exceed 20 characters';
  }

  if (formData.location && formData.location.length > 100) {
    errors.location = 'Location cannot exceed 100 characters';
  }

  return errors;
};
