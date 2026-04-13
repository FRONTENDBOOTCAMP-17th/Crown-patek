import { putAddressApi } from "../API/profile/putAddressApi.js";

export async function editAdressSaveButton() {
  const address = document.getElementById("editAdress").value.trim();
  const addressDetail = document.getElementById("editAdressDetail").value.trim();

  try {
    await putAddressApi({ address, addressDetail });
  } catch (err) {
    alert(err.message);
  }
}