import { get } from "../../../../shareApi/index.js";

export const dashboardAPI = async () => {
  const data = await get("/admin/dashboard");
  return data.data;
};
