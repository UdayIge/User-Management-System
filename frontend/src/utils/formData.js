export const userToFormData = (user, profileFile = null) => {
  const formData = new FormData();
  formData.append('firstName', user.firstName || '');
  formData.append('lastName', user.lastName || '');
  formData.append('email', user.email || '');
  formData.append('mobile', user.mobile || '');
  formData.append('gender', user.gender || '');
  formData.append('status', user.status || 'Active');
  formData.append('location', user.location || '');
  if (profileFile) {
    formData.append('profile', profileFile);
  }
  return formData;
};
