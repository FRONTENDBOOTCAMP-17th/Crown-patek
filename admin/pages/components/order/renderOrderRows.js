import { renderRows } from "../common/renderRows.js";
import { createDetailButton } from "../common/createButton.js";
import { showDetails } from "../common/showDetails.js";

export function renderOrderRows(tbody, orders) {
  tbody.innerHTML = "";

  orders.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className =
      "text-[14px] border-b border-gray-100 hover:bg-gray-50 transition-colors";

    const tdOrderNumber = document.createElement("td");
    tdOrderNumber.className = "px-6 py-5 font-bold text-[#0a0a0a]";
    tdOrderNumber.textContent = item.orderNumber ?? "-";

    const tdUserId = document.createElement("td");
    tdUserId.className = "px-6 py-5 text-(--admin-gray)";
    tdUserId.textContent = item.userId ?? "-";

    const tdName = document.createElement("td");
    tdName.className = "px-6 py-5 text-(--admin-gray)";
    tdName.textContent = item.shippingAddress?.recipientName ?? "-";

    const tdPrice = document.createElement("td");
    tdPrice.className = "px-6 py-5 font-bold text-[#0a0a0a]";
    tdPrice.textContent =
      item.finalPrice != null ? `₩${item.finalPrice.toLocaleString()}` : "-";

    const tdDate = document.createElement("td");
    tdDate.className = "px-6 py-5 text-(--admin-gray)";
    tdDate.textContent = item.orderDate?.split("T")[0] ?? "-";

    const tdActions = document.createElement("td");
    tdActions.className = "px-6 py-5 text-right";

    const button = createDetailButton();
    tdActions.appendChild(button);
    showDetails(
      button,
      item.orderId,
      (id) => `/admin/pages/order-details.html?orderId=${id}`,
    );

    tr.appendChild(tdOrderNumber);
    tr.appendChild(tdUserId);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdDate);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}
