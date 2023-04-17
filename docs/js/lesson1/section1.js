// PAGE TRANSITIONS
// Right
document.querySelector(".right.arrow").addEventListener("click", transitionRight);

function goToNextPage() {
  window.location.href = '/1D-Automata/cell-interactions'
}

function transitionRight() {
  document.querySelector(".content").classList.add('animation-right');
  setTimeout(goToNextPage, 500);
}

// Left
document.querySelector(".left.arrow").addEventListener("click", transitionLeft);

function goToPreviousPage() {
  window.location.href = '/'
}

function transitionLeft() {
  document.querySelector(".content").classList.add('animation-left');
  setTimeout(goToPreviousPage, 500);
}

// ANSWERS

document.getElementsByClassName('answer').forEach((answer) => {
  answer.addEventListener("click", () => {
    if (answer.classList.contains("correct")) {
      answer.style.backgroundColor = 'green';
    } else {
      answer.style.backgroundColor = 'red';
    }
  });
});