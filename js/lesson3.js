// PAGE TRANSITIONS
// Right
document.querySelector(".right.arrow").addEventListener("click", transitionRight);

function goToNextPage() {
  window.location.href = '/videos'
}

function transitionRight() {
  document.querySelector(".content").classList.add('animation-right');
  setTimeout(goToNextPage, 500);
}

// Left
document.querySelector(".left.arrow").addEventListener("click", transitionLeft);

function goToPreviousPage() {
  window.location.href = '/lesson2.3'
}

function transitionLeft() {
  document.querySelector(".content").classList.add('animation-left');
  setTimeout(goToPreviousPage, 500);
}