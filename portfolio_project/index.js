let date = new Date();
const year = date.getFullYear();
const footerP = document.querySelector(".footer-nav p");
footerP.textContent = `@copyright ${year}. All rights reserved`;