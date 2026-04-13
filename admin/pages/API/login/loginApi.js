import { post } from "../../../../shareApi/index.js";

export const loginAPI = async (email, password) => {
  const data = await post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};
