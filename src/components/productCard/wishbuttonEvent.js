import { postWishlist } from "../API/wishlist/postWishlistApi";
import { changeSVG } from "../wishlist/changeSVG";

export async function wishbuttonEvent(token) {
    const buttons = document.querySelectorAll(".wishButton");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            const productId = Number(button.dataset.productId);
            const isWishlisted = button.dataset.wishlist === "1";

            if (!isWishlisted) {
                const result = await postWishlist(token, productId);
                if (result) {
                    button.dataset.wishlist = "1";
                    changeSVG(button, true);
                }
            }
        });
    });
}