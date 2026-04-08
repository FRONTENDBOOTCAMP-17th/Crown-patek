const BASE_URL = "https://api.fullstackfamily.com";

export async function userDetailAPI(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/gentlelion/v1/admin/users/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("회원 정보를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}
