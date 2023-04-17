// PAGE TRANSITIONS
// Right
document.querySelector(".right.arrow").addEventListener("click", transitionRight);

function goToNextPage() {
  window.location.href = '/2D-Automata/conways-rules';
}

function transitionRight() {
  document.querySelector(".content").classList.add('animation-right');
  setTimeout(goToNextPage, 500);
}

// Left
document.querySelector(".left.arrow").addEventListener("click", transitionLeft);

function goToPreviousPage() {
  window.location.href = '/1D-Automata/cell-interactions';
}

function transitionLeft() {
  document.querySelector(".content").classList.add('animation-left');
  setTimeout(goToPreviousPage, 500);
}

// RULE GENERATION
let rulegen = [false, false, false, true, true, true, true, false];
let values = [128, 64, 32, 16, 8, 4, 2, 1];

document.querySelectorAll(".rulegen-button").forEach(button => {
  button.addEventListener("click", () => {
    let rule = button.id.charAt(4);
    if (rulegen[rule]) {
      rulegen[rule] = false;
      ruleOffGen(rule);
    } else {
      rulegen[rule] = true;
      ruleOnGen(rule);
    } 
  });
});

function ruleOnGen(ruleNumber) {
  document.getElementById("resultgen" + ruleNumber).innerHTML = "◼︎";
  updateText();
}

function ruleOffGen(ruleNumber) {
  document.getElementById("resultgen" + ruleNumber).innerHTML = "◻";
  updateText();
}

function updateText() {
  let rulesBinary = rulegen.join().replaceAll("true", "1").replaceAll("false", "0").replaceAll(",", "");
  document.getElementById('ruleIndicator').removeAttribute('hidden');
  document.getElementById('ruleNumber').innerHTML = parseInt(rulesBinary, 2);
}