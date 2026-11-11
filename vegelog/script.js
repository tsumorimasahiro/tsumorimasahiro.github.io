"use strict";

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function selectFeature(tab, moveFocus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle("is-active", selected);
    document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
  }
  if (moveFocus) tab.focus();
}

for (const tab of tabs) {
  tab.addEventListener("click", () => selectFeature(tab));
  tab.addEventListener("keydown", event => {
    const index = tabs.indexOf(tab);
    let target;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") target = (index + 1) % tabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = tabs.length - 1;
    if (target !== undefined) {
      event.preventDefault();
      selectFeature(tabs[target], true);
    }
  });
}
