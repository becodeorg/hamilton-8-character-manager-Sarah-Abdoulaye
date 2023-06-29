const menuHamburger = document.querySelector(".burger");
const navLinks = document.querySelector(".menu");

menuHamburger.addEventListener('click',()=>{
navLinks.classList.toggle('mobile-menu')
})