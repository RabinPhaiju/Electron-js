const path = require("path");
const { ipcRenderer } = require("electron");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

let cpuOverload;
let memOverload;
let alertFrequency;

// Get settings & values
ipcRenderer.on("settings:get", (e, settings) => {
  cpuOverload = +settings.cpuOverload;
  memOverload = +settings.memOverload;
  alertFrequency = +settings.alertFrequency;
});

// Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then((info) => {
    document.getElementById("cpu-usage").innerText = info + "%";

    document.getElementById("cpu-progress").style.width = info + "%";

    // Make progress bar red if overload
    if (info >= cpuOverload) {
      document.getElementById("cpu-progress").style.background = "red";
    } else {
      document.getElementById("cpu-progress").style.background = "#30c88b";
    }

    // Check cpu overload
    if (info >= cpuOverload && runNotify(alertFrequency, "cpu")) {
      notifyUser({
        title: "CPU Overload",
        body: `CPU is over ${cpuOverload}%`,
        icon: path.join("./icons/", "icon.png"),
      });

      localStorage.setItem("lastNotifyCpu", +new Date());
    }
  });
  // Mem Usage
  mem.info().then((info) => {
    let usedMem = (info.usedMemMb / info.totalMemMb) * 100;
    document.getElementById("mem-progress").style.width = usedMem + "%";
    // Make progress bar red if overload
    if (usedMem >= memOverload) {
      document.getElementById("mem-progress").style.background = "red";
    } else {
      document.getElementById("mem-progress").style.background = "#30c88b";
    }
    // Check mem overload
    if (usedMem >= memOverload && runNotify(alertFrequency, "mem")) {
      notifyUser({
        title: "Memory Overload",
        body: `Memory is over ${memOverload}%`,
        icon: path.join("./icons/", "icon.png"),
      });

      localStorage.setItem("lastNotifyMem", +new Date());
    }
  });
  // Free Mem
  mem.info().then((info) => {
    document.getElementById("mem-free").innerText = info.freeMemMb;
  });

  //   CPU Free
  cpu.free().then((info) => {
    document.getElementById("cpu-free").innerText = info + "%";
  });

  //   Uptime
  document.getElementById("sys-uptime").innerText = secondsToDhms(os.uptime());
}, 1500);

// Set model
document.getElementById("cpu-model").innerText = cpu.model();

// Computer Name
document.getElementById("comp-name").innerText = os.hostname();

// OS
document.getElementById("os").innerText = `${os.type()} ${os.arch()}`;
if (os.ip()) {
  document.getElementById("sys-ip").innerText = os.ip();
} else {
  document.getElementById("sys-ip").innerText = "Not Connected";
}

// Total Mem
mem.info().then((info) => {
  document.getElementById("mem-total").innerText = info.totalMemMb;
});

// Show days, hours, mins, sec
function secondsToDhms(seconds) {
  seconds = +seconds;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d, ${h}h, ${m}m, ${s}s`;
}

// Send notification
function notifyUser(options) {
  new Notification(options.title, options);
}

// Check how much time has passed since notification
function runNotify(frequency, type) {
  if (localStorage.getItem("lastNotifyCpu") === null && type == "cpu") {
    // Store timestamp
    localStorage.setItem("lastNotifyCpu", +new Date());
    return true;
  } else if (localStorage.getItem("lastNotifyMem") === null && type == "mem") {
    // Store timestamp
    localStorage.setItem("lastNotifyMem", +new Date());
    return true;
  } else if (type == "cpu") {
    const notifyTime = new Date(parseInt(localStorage.getItem("lastNotifyCpu")));
    const now = new Date();
    const diffTime = Math.abs(now - notifyTime);
    const minutesPassed = Math.ceil(diffTime / (1000 * 60));
    if (minutesPassed > frequency) {
      return true;
    } else {
      return false;
    }
  } else if (type == "mem") {
    const notifyTime = new Date(parseInt(localStorage.getItem("lastNotifyMem")));
    const now = new Date();
    const diffTime = Math.abs(now - notifyTime);
    const minutesPassed = Math.ceil(diffTime / (1000 * 60));
    if (minutesPassed > frequency) {
      return true;
    } else {
      return false;
    }
  }
}
