export function initSubNav(container, options = {}) {
  if (!container) return;

  const {
    buttonSelector = ".subnav-btn",
    activeClass = "bg-(--subTitle-button)",
    inactiveClass = "bg-white",
    enableDrag = true,
  } = options;

  container.addEventListener("click", (e) => {
    const button = e.target.closest(buttonSelector);

    if (!button || !container.contains(button)) return;

    const buttons = container.querySelectorAll(buttonSelector);

    buttons.forEach((btn) => {
      btn.classList.remove(activeClass);
      btn.classList.add(inactiveClass);
    });

    button.classList.remove(inactiveClass);
    button.classList.add(activeClass);
  });

  if (!enableDrag) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = false;

    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;

    container.classList.add("cursor-grabbing");
    container.classList.remove("cursor-grab");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;

    if (Math.abs(walk) > 5) {
      isDragging = true;
    }

    e.preventDefault();
    container.scrollLeft = scrollLeft - walk;
  });

  function stopDrag() {
    isDown = false;

    container.classList.remove("cursor-grabbing");
    container.classList.add("cursor-grab");

    requestAnimationFrame(() => {
      isDragging = false;
    });
  }

  container.addEventListener("mouseup", stopDrag);
  container.addEventListener("mouseleave", stopDrag);

  container.addEventListener("click", (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}