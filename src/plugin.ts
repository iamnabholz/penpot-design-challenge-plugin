penpot.ui.open("Design Challenge Generator", `?theme=${penpot.theme}`, {
  width: 280,
  height: 320,
});

import prompt_design from "../public/challenge-design.json";
import prompt_for from "../public/challenge-for.json";

penpot.ui.onMessage<string>((message) => {
  if (message === "generate") {
    const c_design =
      prompt_design[Math.floor(Math.random() * prompt_design.length)];

    const c_for = prompt_for[Math.floor(Math.random() * prompt_for.length)];

    penpot.ui.sendMessage({
      message: "return",
      challenge: c_design,
      for: c_for,
    });
  }
});

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
