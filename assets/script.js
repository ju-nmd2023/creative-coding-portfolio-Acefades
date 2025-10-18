const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const p5container = document.getElementById("p5container");
const nameText = document.getElementById("name");
const descriptionText = document.getElementById("description");

let currentExperiment = 0;
let experiments = [];

// Load experiments from data.json
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    experiments = data;
    if (experiments.length > 0) goToExperiment(0);
  });

function goToExperiment(index) {
  const experiment = experiments[index];
  if (!experiment) return;

  p5container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const bodyElement = document.createElement("div");

  // p5.js always loaded
  const p5script = document.createElement("script");
  p5script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.js";
  p5script.defer = true;
  bodyElement.appendChild(p5script);

  // Tone.js only for flow2.js
  if (experiment.file.includes("flow2.js")) {
    const toneScript = document.createElement("script");
    toneScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.39/Tone.min.js";
    toneScript.defer = true;
    bodyElement.appendChild(toneScript);
  }

  // Experiment code
  const codeScript = document.createElement("script");
  codeScript.src = experiment.file;
  codeScript.defer = true;
  bodyElement.appendChild(codeScript);

  // iframe CSS
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "assets/iframe.css";
  bodyElement.appendChild(styleLink);

  iframe.srcdoc = bodyElement.innerHTML;
  p5container.appendChild(iframe);

  // Update text
  nameText.innerText = experiment.name;
  descriptionText.innerText = experiment.description;
}

nextButton.addEventListener("click", () => {
  currentExperiment = (currentExperiment + 1) % experiments.length;
  goToExperiment(currentExperiment);
});

prevButton.addEventListener("click", () => {
  currentExperiment =
    (currentExperiment - 1 + experiments.length) % experiments.length;
  goToExperiment(currentExperiment);
});
