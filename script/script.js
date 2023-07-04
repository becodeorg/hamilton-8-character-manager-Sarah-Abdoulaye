const menuHamburger = document.querySelector(".burger");
const navLinks = document.querySelector(".menu");
//menu hamburger
menuHamburger.addEventListener('click',()=>{
navLinks.classList.toggle('mobile-menu')
});
