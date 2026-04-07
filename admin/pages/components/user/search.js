export function search(users, input, onSearch) {
  if (!input) return;

  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      onSearch(users);
      return;
    }

    const filteredUsers = users.filter((item) => {
      const userId = String(item.userId ?? "").toLowerCase();
      const userEmail = String(item.email ?? "").toLowerCase();

      return (
        userId.includes(keyword) ||
        userEmail.includes(keyword)
      );
    });

    onSearch(filteredUsers);
  });
}