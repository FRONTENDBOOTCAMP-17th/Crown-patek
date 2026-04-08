const BASE_URL = "https://api.fullstackfamily.com";

export async function loginAPI(email, password) {
  const response = await fetch(`${BASE_URL}/api/gentlelion/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  return data;
}
