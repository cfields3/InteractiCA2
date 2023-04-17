// PAGE TRANSITIONS
// Right
// document.querySelector(".right.arrow").addEventListener("click", transitionRight);

// function goToNextPage() {
//   window.location.href = '/lesson1'
// }

// function transitionRight() {
//   document.querySelector(".content").classList.add('animation-right');
//   setTimeout(goToNextPage, 500);
// }

let images = ['/images/home-images/ca-30.gif', '/images/home-images/ca-54.gif', '/images/home-images/ca-60.gif',
              '/images/home-images/ca-76.gif', '/images/home-images/ca-129.gif', '/images/home-images/ca-205.gif'];

let index = 0;
let imgElement = document.getElementById('top-image');

function change() {
  imgElement.style.backgroundImage = "url(" + images[index] + ")";
  index >= 5 ? index = 0 : index++;
}

window.onload = function() {
    setInterval(change, 5000);
};