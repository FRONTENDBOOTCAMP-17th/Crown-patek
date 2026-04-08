const BASE_URL = "https://api.fullstackfamily.com";

export async function logoutAPI() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/gentlelion/v1/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("로그아웃에 실패했습니다.");
  }

  localStorage.removeItem("token");
  window.location.href = "./admin-login.html";
}
