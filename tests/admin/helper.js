export async function login(page) {
  // 로그인 페이지로 먼저 이동 후 토큰 제거 (addInitScript 대신)
  // 로그인 페이지는 토큰 없으면 리다이렉트하지 않으므로 안전
  await page.goto("/pages/login.html", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.removeItem("token"));

  await page.fill(
    'input[type="email"], input[name="email"], #email',
    "admin@gentlemonster.com",
  );
  await page.fill(
    'input[type="password"], input[name="password"], #password',
    "admin123",
  );
  await Promise.all([
    page.waitForURL(/dashboard/, { waitUntil: "domcontentloaded" }),
    page.click('button[type="submit"], .login-btn, #login-btn'),
  ]);
}