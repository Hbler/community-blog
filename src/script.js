//// Imports
import LayoutController from "./controllers/LayoutController.js";

//// Flow
if (document.title === "Blog | Hugo Bler") {
  window.location = "./src/pages/login.html";
} else if (document.title === "Blog - Login | Hugo Bler") {
  LayoutController.loginPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (document.title === "Blog - Sign Up | Hugo Bler") {
  LayoutController.registerPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (document.title === "Blog - Main | Hugo Bler") {
  LayoutController.mainPage();
  const pagination = document.querySelector(".main__pagination");
  setTimeout(() => {
    if (document.readyState === "complete" && pagination.innerHTML === "") {
      location.reload();
    }
  }, 1000);
}
