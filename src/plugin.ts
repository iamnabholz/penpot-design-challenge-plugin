penpot.ui.open("Design Challenge Generator", `?theme=${penpot.theme}`, {
  width: 280,
  height: 320,
});

import prompt_design from "../public/challenge-design.json";
import prompt_for from "../public/challenge-for.json";
import prompt_locations from "../public/challenge-locations.json";

penpot.ui.onMessage<string>((message) => {
  if (message === "generate") {
    const c_design =
      prompt_design[Math.floor(Math.random() * prompt_design.length)];

    let c_for = prompt_for[Math.floor(Math.random() * prompt_for.length)];

    const locationRegex = /in\s[A-Z][a-z]+/;
    if (locationRegex.test(c_for)) {
      const locations = prompt_locations[Math.floor(Math.random() * prompt_locations.length)];
      if (Math.random() >= 0.65) {
        c_for = c_for.replace(locationRegex, `in ${locations}`);
      } else {
        c_for = c_for.replace(locationRegex, "");
      }
    }

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
