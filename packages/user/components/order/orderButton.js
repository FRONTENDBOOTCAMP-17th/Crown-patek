import { orderPostApi } from "../API/order/orderPostApi.js";

export async function orderButton(items, pointsToUse, userMeta) {
  const buttons = document.querySelectorAll(".order-checkout-btn");

  const shippingAddress = {
    recipientName: userMeta.firstName + userMeta.lastName,
    phone: userMeta.phone,
    address: userMeta.address,
    addressDetail: userMeta.addressDetail,
  };

  const userEmail = document.getElementById("userEmail");
  const userName = document.getElementById("userName");
  const phoneNum = document.getElementById("phoneNum");
  const address = document.getElementById("address");

  userEmail.textContent = userMeta.email;
  userName.textContent = shippingAddress.recipientName;
  phoneNum.textContent = shippingAddress.phone;
  address.textContent = shippingAddress.address + shippingAddress.addressDetail;

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      handleCheckout(items, shippingAddress, pointsToUse),
    );
  });
}

async function handleCheckout(items, shippingAddress, pointsToUse) {
  const success = await orderPostApi(items, shippingAddress, pointsToUse);
  if (success) {
    window.location.href = "/";
  }
}
