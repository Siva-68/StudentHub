import API from "./api";

/**
 * Get paginated & filtered list of students
 * @param {Object} params - { page, limit, search, course, year, sort, order }
 */
export const getAllStudents = async (params = {}) => {
  const response = await API.get("/students", { params });
  return response.data; // ApiResponse structure: { success, message, data }
};

/**
 * Get detailed information for a single student
 * @param {string} id - Student ID
 */
export const getStudentById = async (id) => {
  const response = await API.get(`/students/${id}`);
  return response.data;
};

/**
 * Create a new student record
 * @param {FormData} formData - Multipart form containing text fields and profileImage
 */
export const createStudent = async (formData) => {
  const response = await API.post("/students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Update an existing student record
 * @param {string} id - Student ID
 * @param {FormData} formData - Multipart form containing text fields and/or profileImage
 */
export const updateStudent = async (id, formData) => {
  const response = await API.put(`/students/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Delete a student record
 * @param {string} id - Student ID
 */
export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);
  return response.data;
};

/**
 * Get student statistics (course distribution, year distribution, total counts)
 */
export const getStudentStats = async () => {
  const response = await API.get("/students/stats");
  return response.data;
};
