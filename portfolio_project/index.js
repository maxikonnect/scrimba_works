let date = new Date();
const year = date.getFullYear();
const footer = document.querySelector(".footer-nav p");
footer.textContent = `@copyright ${year}. All rights reserved`;