export function showDetails(button, userId) {
  if (!button) return;
  if (userId == null) {
    console.error("userId가 없습니다.");
    return;
  }

  button.addEventListener("click", () => {
    window.location.href = `/admin/orders/${userId}`;
  });
}