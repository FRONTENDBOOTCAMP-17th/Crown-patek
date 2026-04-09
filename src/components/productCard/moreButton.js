export async function moreButton(container, products) {
    const response = await fetch('/src/components/productCard/moreButton.html');
    if (!response.ok) return;

    const meta = products.meta;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const text = doc.body.firstElementChild;

    text.querySelector(".current-products").textContent = products.data.length;
    text.querySelector(".total-products").textContent = meta.totalCount

    container.appendChild(doc.body.firstElementChild);
}