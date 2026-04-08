const BASE_URL = "https://api.fullstackfamily.com";

export async function adjustPoint(type, currentUser) {
  const amount = parseInt(document.getElementById("point-input").value);
  if (!amount || amount <= 0) return alert("포인트 금액을 입력해주세요.");

  const points = type === "add" ? amount : -amount;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${BASE_URL}/api/gentlelion/v1/admin/users/${currentUser.userId}/points`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points }),
      },
    );

    if (!response.ok) {
      throw new Error("포인트 변경에 실패했습니다.");
    }

    const data = await response.json();
    currentUser.points = data.data.points;

    document.getElementById("user-points").textContent =
      currentUser.points.toLocaleString() + "P";
    document.getElementById("point-input").value = "";
  } catch (error) {
    alert(error.message);
  }
}
