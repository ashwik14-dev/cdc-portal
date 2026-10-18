import { api } from "./apiClient";

export const adminApi = {
  createFaculty: (data) => api.post("/admin/faculty", data),
  listFaculty: () => api.get("/admin/faculty"),
  createStudent: (data) => api.post("/admin/students", data),
  listStudents: () => api.get("/admin/students"),
  updateStudent: (id, data) => api.patch(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),
};
