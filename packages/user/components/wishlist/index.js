import { getWishlist } from "../API/wishlist/wishlistApi.js";
import { wishbuttonEvent } from "../productCard/wishbuttonEvent.js";
import { changeBtnState } from "./changeBtnState.js";

export async function wishlist() {
  const data = await getWishlist();
  if (!data) {
    return;
  }
  wishbuttonEvent(data);
  changeBtnState(data);
}
