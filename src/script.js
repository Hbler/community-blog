//// Imports
import Layout from "./controllers/Layout.js";

//// Flow
if (document.title === "Blog | Hugo Bler") {
  window.location = "./src/pages/login.html";
} else if (document.title === "Blog - Login | Hugo Bler") {
  Layout.loginPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (document.title === "Blog - Sign Up | Hugo Bler") {
  Layout.registerPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (document.title === "Blog - Main | Hugo Bler") {
  Layout.mainPage();
}
