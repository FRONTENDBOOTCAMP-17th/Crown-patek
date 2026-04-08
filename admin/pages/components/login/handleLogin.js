import { loginAPI } from "../../API/login/loginApi.js";

export async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  const btn = document.getElementById("submitBtn");

  errorMsg.classList.add("hidden");
  btn.innerHTML = "로그인 중...";
  btn.disabled = true;

  try {
    const data = await loginAPI(email, password);

    if (data) {
      btn.innerHTML = "로그인 성공";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    }
  } catch (error) {
    errorMsg.classList.remove("hidden");
    btn.innerHTML = "<span>→</span> 로그인";
    btn.disabled = false;
  }
}

window.handleLogin = handleLogin;
