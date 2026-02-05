import apiClient from './client';

export const fetchUsers = async (params = {}) => {
  const { data } = await apiClient.get('/users', { params });
  return data;
};

export const fetchUserById = async (id) => {
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
};

export const createUser = async (formData) => {
  const { data } = await apiClient.post('/users', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateUser = async (id, formData) => {
  const { data } = await apiClient.put(`/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
};

export const exportUsersToCsv = async () => {
  const { data } = await apiClient.get('/users/export', {
    responseType: 'blob',
  });
  return data;
};
