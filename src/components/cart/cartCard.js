export async function cartCard(container, data) {
    const response = await fetch('/src/components/cart/cartCard.html');
    if (!response.ok) return;

    const html = await response.text();

    for (const product of data.data.items) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const card = doc.body.firstElementChild;

        console.log(product);

        // 이미지
        const img = card.querySelector(".cart-product-image");
        if (img) {
            img.src = product.imageUrl ?? '';
            img.alt = product.name ?? '';
        }

        // 텍스트
        card.querySelector(".cart-product-name").textContent = product.name;
        card.querySelector(".cart-product-color").textContent = product.color ?? '';
        card.querySelector(".cart-product-price").textContent = "₩" + product.price.toLocaleString();

        // 수량
        const select = card.querySelector(".cart-quantity");
        if (select) {
            select.value = product.quantity ?? 1;

            select.addEventListener("change", (e) => {
                console.log(`수량 변경: ${product.id} → ${e.target.value}`);
                // TODO: 수량 변경 API 호출
            });
        }

        // 삭제
        const deleteBtn = card.querySelector(".cart-delete-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                console.log(`삭제: ${product.id}`);
                card.remove();
                // TODO: 삭제 API 호출
            });
        }

        // 위시리스트
        const wishButton = card.querySelector(".wishButton");
        if (wishButton) {
            wishButton.dataset.productId = product.id;
        }

        container.appendChild(card);
    }
}