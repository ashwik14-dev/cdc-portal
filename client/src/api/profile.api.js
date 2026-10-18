import { api } from "./apiClient";

export const profileApi = {
  me: () => api.get("/profile/me"),
  updatePhoto: (photo) => api.put("/profile/me/photo", { photo }),
  removePhoto: () => api.delete("/profile/me/photo"),
};
