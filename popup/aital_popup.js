function savePosition(e) {
  if (!e.target.id === "xPosition" || !e.target.id === "yPosition") {
    // Ignore when click is not on a button within <div id="popup-content">.
    return;
  }

  const x = parseInt(document.getElementById("xPosition").value);
  const y = parseInt(document.getElementById("yPosition").value);
  const res = browser.storage.sync.set({
    aitalPosition: {x, y},
  });
  res.then((re) => console.log(re));
}

function restoreOptions() {
  function setCurrentChoice(result) {
    console.log("result", result);
    let [x, y] = [50, 10];
    if (result.aitalPosition) {
      x = result.aitalPosition.x;
      y = result.aitalPosition.y;
    }
    document.getElementById("xPosition").value = x;
    document.getElementById("yPosition").value = y;
  }

  function onError(error) {
    console.log(`AITAL error: ${error}`);
  }

  let getting = browser.storage.sync.get("aitalPosition");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("click", savePosition);
document.addEventListener("DOMContentLoaded", restoreOptions);
