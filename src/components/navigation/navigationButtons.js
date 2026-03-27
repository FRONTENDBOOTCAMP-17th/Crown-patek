import { collections } from "../../data/collection.js";
import { initSubNav } from "./navigationEvent.js";

const navigationList = document.getElementById("navigationList");

if (!navigationList) {
  throw new Error('id="navigationList" 요소를 찾을 수 없습니다.');
}

function createCollectionDetailUrl(slug) {
  const url = new URL("/src/pages/collection-detail.html", window.location.origin);
  url.searchParams.set("slug", String(slug ?? ""));
  return url.toString();
}

function createCollectionItem(collection, index) {
  const itemList = document.createElement("li");
  itemList.className = "shrink-0";

  const item = document.createElement("a");
  item.href = createCollectionDetailUrl(collection?.slug);

  item.className = [
    "subnav-btn",
    "cursor-pointer",
    "flex",
    "items-center",
    "rounded-[20px]",
    "py-2",
    "px-3.25",
    "border",
    "border-(--subTitle-button)",
    index === 0 ? "bg-(--subTitle-button)" : "bg-white",
  ].join(" ");

  const title = document.createElement("span");
  title.className = "text-center leading-3.5 text-[8.9px] text-(--text-primary)";
  title.textContent = String(collection?.name ?? "");

  item.appendChild(title);
  itemList.appendChild(item);

  return itemList;
}

function renderCollections(collections) {
  if (!Array.isArray(collections)) {
    console.error("collections는 배열이어야 합니다.");
    return;
  }

  navigationList.className =
    "flex gap-2.5 overflow-x-auto whitespace-nowrap text-[8.9px] select-none cursor-grab";

  const fragment = document.createDocumentFragment();

  collections.forEach((collection, index) => {
    fragment.appendChild(createCollectionItem(collection, index));
  });

  navigationList.replaceChildren(fragment);
}

renderCollections(collections);

initSubNav(navigationList, {
  buttonSelector: ".subnav-btn",
  activeClass: "bg-(--subTitle-button)",
  inactiveClass: "bg-white",
});