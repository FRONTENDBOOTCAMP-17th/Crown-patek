import { post } from "../../../../shareApi/index.js";

export const logoutAPI = async () => {
  await post("/auth/logout");
  localStorage.removeItem("token");
  window.location.href = "./login.html";
};
