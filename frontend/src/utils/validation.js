const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10,15}$/;

export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email.trim())) return "Please enter a valid email";
  return "";
};

export const validateMobile = (mobile) => {
  if (!mobile?.trim()) return "";
  if (!MOBILE_REGEX.test(mobile.trim())) {
    return "Mobile number must be 10-15 digits";
  }
  return "";
};

export const validateRequired = (value, fieldName) => {
  if (!value?.toString().trim()) return `${fieldName} is required`;
  return "";
};

export const validateMaxLength = (value, max, fieldName) => {
  if (value && value.length > max)
    return `${fieldName} cannot exceed ${max} characters`;
  return "";
};

export const validateUserForm = (formData) => {
  const errors = {};

  // First name is required
  const firstNameError =
    validateRequired(formData.firstName, "First name") ||
    validateMaxLength(formData.firstName, 50, "First name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateMaxLength(formData.lastName, 50, "Last name");
  if (lastNameError) errors.lastName = lastNameError;

  // Gender is required
  if (!formData.gender || !formData.gender.trim()) {
    errors.gender = "Gender is required";
  }

  // Status is required
  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  // At least one of email or mobile is required
  const hasEmail = formData.email && formData.email.trim();
  const hasMobile = formData.mobile && formData.mobile.trim();

  if (!hasEmail && !hasMobile) {
    errors.email = "Either email or mobile is required";
    errors.mobile = "Either email or mobile is required";
  } else {
    // Validate email if provided
    if (hasEmail) {
      if (!EMAIL_REGEX.test(formData.email.trim())) {
        errors.email = "Please enter a valid email";
      }
    }

    // Validate mobile if provided
    if (hasMobile) {
      const mobileError = validateMobile(formData.mobile);
      if (mobileError) errors.mobile = mobileError;
    }
  }

  if (formData.location && formData.location.length > 100) {
    errors.location = "Location cannot exceed 100 characters";
  }

  return errors;
};
