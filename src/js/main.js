import { version } from "../../package.json";

export default function () {
  console.log("running version " + version);
  const article3 = document.getElementById("article-3");
  let hoverBox;

  article3.addEventListener("mouseenter", () => {
    hoverBox = document.createElement("div");
    hoverBox.textContent = "Popular";

    Object.assign(hoverBox.style, {
      position: "absolute",
      padding: "8px",
      backgroundColor: "#11263c",
      color: "#ffffff",
      padding: "10px",
      fontWeight: "bold",
      zIndex: 1000,
    });

    const rect = article3.getBoundingClientRect();
    hoverBox.style.top = `${rect.top + window.scrollY}px`;
    hoverBox.style.left = `${rect.left + window.scrollX}px`;
    document.body.appendChild(hoverBox);
  });

  article3.addEventListener("mouseleave", () => {
    if (hoverBox) {
      document.body.removeChild(hoverBox);
      hoverBox = null;
    }
  });
}
