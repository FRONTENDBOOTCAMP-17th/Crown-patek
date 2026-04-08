import { renderRows } from "../common/renderRows.js";
import { createDetailButton } from "../common/createButton.js";
import { showDetails } from "../common/showDetails.js";

export function renderOrderRows(tbody, orders) {
  renderRows(tbody, orders, {
    columns: [
      { getValue: (item) => item.orderNumber, className: "py-5" },
      { getValue: (item) => item.userId, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.shippingAddress?.recipientName, className: "py-5 text-(--admin-gray)" },
      { getValue: (item) => item.finalPrice?.toLocaleString(), className: "py-5" },
      { getValue: (item) => item.orderDate?.split("T")[0], className: "py-5 text-(--admin-gray)" },
    ],
    renderButtons: (tdButton, item) => {
      const button = createDetailButton();
      tdButton.appendChild(button);
      showDetails(button, item.orderId, (id) => `/admin/pages/order-details.html?orderId=${id}`);
    },
  });
}