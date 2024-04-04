const startTime = new Date();

function setTime() {
  const nowtime = new Date();
  const ingtime = new Date(nowtime - startTime);

  const m = ingtime.getMinutes().toString();
  const s = ingtime.getSeconds().toString();
  const timeH1 = document.querySelector("#time");
  timeH1.innerText = `${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
}

//주기성
setInterval(setTime, 1000);
