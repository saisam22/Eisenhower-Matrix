let alreadySaved = true;  // start locked (empty matrix shouldn't be saved)

document.getElementById("form1").addEventListener("submit", function(e) {
  e.preventDefault();

  let task = document.getElementById("taskip").value.trim();
  let urgency = document.getElementById("urg").value;
  let importance = document.getElementById("imp").value;

  if (task === "" || urgency === "" || importance === "") return;

  let quadrantId = "";
  if (urgency === "Urgent" && importance === "Important") {
    quadrantId = "q1";
  } else if (urgency === "Not Urgent" && importance === "Important") {
    quadrantId = "q2";
  } else if (urgency === "Urgent" && importance === "Not Important") {
    quadrantId = "q3";
  } else {
    quadrantId = "q4";
  }

  let itemadd = document.createElement("li");
  itemadd.innerText = task;
  document.querySelector(`#${quadrantId} ul`).appendChild(itemadd);
  document.getElementById("form1").reset();

  //unlock savebtn
  alreadySaved = false;
});


function saveAsImage() {
  if (alreadySaved) {
    alert("⚠️ Nothing new to save! Add tasks first.");
    return;
  }

  const matrix = document.getElementById("matrix");
  html2canvas(matrix).then(canvas => {
    const link = document.createElement("a");
    link.download = "eisenhower-matrix.png";
    link.href = canvas.toDataURL();
    link.click();

    alreadySaved = true; // lock again until new changes
  });
}
