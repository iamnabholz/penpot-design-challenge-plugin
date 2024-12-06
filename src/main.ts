import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

document.addEventListener("DOMContentLoaded", function () {
  parent.postMessage("generate", "*");
});

document
  .querySelector("[data-handler='generate']")
  ?.addEventListener("click", () => {
    // send message to plugin.ts
    parent.postMessage("generate", "*");
  });

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }

  if (event.data.message === "return") {
    const prompt_design = document.getElementById("prompt-design");
    if (prompt_design) {
      prompt_design.innerHTML = event.data.challenge;
    }

    const prompt_for = document.getElementById("prompt-for");
    if (prompt_for) {
      prompt_for.innerHTML = event.data.for;
    }
  }
});
