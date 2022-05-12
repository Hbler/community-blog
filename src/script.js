//// Imports
import Layout from "./controllers/Layout.js";

//// Flow
if (String(self.location.href).includes("index")) {
  console.log("hi");
  Layout.loginPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (String(self.location.href).includes("register")) {
  Layout.registerPage();

  const form = document.querySelector("form");
  form.classList.add("slideFromBottom");
} else if (String(self.location.href).includes("main")) {
  Layout.mainPage();
  //   Layout.postsPage();
}
