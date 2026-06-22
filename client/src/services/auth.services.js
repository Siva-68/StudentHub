import API from "./api";

/**
 * Register a new admin account
 * @param {Object} adminData - { name, email, password }
 */
export const registerAdmin = async (adminData) => {
  const response = await API.post("/auth/register", adminData);
  return response.data;
};

/**
 * Login an existing admin
 * @param {Object} credentials - { email, password }
 */
export const loginAdmin = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};
