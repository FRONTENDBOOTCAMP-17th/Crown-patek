const BASE_URL = "https://api.fullstackfamily.com";

export async function dashboardAPI() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/gentlelion/v1/admin/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("대시보드 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}
