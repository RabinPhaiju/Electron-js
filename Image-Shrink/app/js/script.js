const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

const form = document.getElementById("image-form");
const slider = document.getElementById("slider");
const img = document.getElementById("img");

document.getElementById("output-path").innerText = path.join(os.homedir(), "Desktop");

// Onsubmit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (img.files[0]) {
    const imgPath = img.files[0].path;
    const quality = slider.value;

    //   sent data to main.js
    ipcRenderer.send("image:minimize", {
      imgPath,
      quality,
    });
  }
});

// On done
ipcRenderer.on("image:done", () => {
  M.toast({
    html: `Image resized to ${slider.value}% quality.`,
  });
});
