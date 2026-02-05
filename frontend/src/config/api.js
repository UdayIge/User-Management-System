const API_BASE = import.meta.env.VITE_API_URL || '';

export const getApiBaseUrl = () => API_BASE;

export const getAssetUrl = (path) => {
  if (!path) return '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE.replace(/\/$/, '')}${normalized}` : normalized;
};
