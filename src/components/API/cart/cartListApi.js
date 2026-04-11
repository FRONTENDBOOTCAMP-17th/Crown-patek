export async function getCartListApi(token) {
  const API_URL =
    `https://api.fullstackfamily.com/api/gentlelion/v1/cart`;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("쇼핑백 목록 로드 실패");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}