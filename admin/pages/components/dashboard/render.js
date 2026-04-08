import { formatPrice, formatDate } from "./formatters.js";

export function render(data) {
  const s = data.summary;
  document.getElementById("stat-users").textContent =
    s.totalUsers.toLocaleString();
  document.getElementById("stat-products").textContent =
    s.totalProducts.toLocaleString();
  document.getElementById("stat-orders").textContent =
    s.totalOrders.toLocaleString();
  document.getElementById("stat-revenue").textContent = formatPrice(
    s.totalRevenue,
  );

  document.getElementById("orderTableBody").innerHTML = data.recentOrders
    .map(
      (o) => `
      <tr class="border-b border-[#e4e7ec] hover:bg-[#f9fafb]">
        <td class="px-6 py-4 text-sm font-medium text-[#101828] leading-5 tracking-[-0.15px]">${o.orderNumber ?? "-"}</td>
        <td class="px-6 py-4 text-sm font-normal text-[#101828] leading-5 tracking-[-0.15px]">${o.orderId ?? "-"}</td>
        <td class="px-6 py-4 text-sm font-normal text-[#101828] leading-5 tracking-[-0.15px]">${o.totalPrice != null ? o.totalPrice.toLocaleString("ko-KR", { style: "currency", currency: "KRW" }) : "-"}</td>
        <td class="px-6 py-4 text-sm font-normal text-[#667085] leading-5 tracking-[-0.15px]">${formatDate(o.orderDate)}</td>
      </tr>
    `,
    )
    .join("");

  document.getElementById("orderCardBody").innerHTML = data.recentOrders
    .map(
      (o) => `
      <div class="px-6 py-4 border-b border-[#e4e7ec]">
        <p class="text-sm font-medium text-[#101828] leading-5 tracking-[-0.15px] mb-0.5">${o.orderNumber ?? "-"}</p>
        <p class="text-sm font-normal text-[#667085] leading-5 tracking-[-0.15px] mb-2">주문 ID: ${o.orderId ?? "-"}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm font-bold text-[#101828] leading-5 tracking-[-0.15px]">${o.totalPrice != null ? o.totalPrice.toLocaleString("ko-KR", { style: "currency", currency: "KRW" }) : "-"}</span>
          <span class="text-sm font-normal text-[#667085] leading-5 tracking-[-0.15px]">${formatDate(o.orderDate)}</span>
        </div>
      </div>
    `,
    )
    .join("");
}
