//// Imports
import Layout from "./controllers/Layout.js";

//// Functions
function url_redirect(url) {
  var X = setTimeout(function () {
    window.location.replace(url);
    return true;
  }, 300);

  if ((window.location = url)) {
    clearTimeout(X);
    return true;
  } else {
    if ((window.location.href = url)) {
      clearTimeout(X);
      return true;
    } else {
      clearTimeout(X);
      window.location.replace(url);
      return true;
    }
  }
  return false;
}

//// Flow
if (String(self.location.href).includes("index")) {
  console.log(self.location.href);
  url_redirect("./src/pages/login.html");
} else if (String(self.location.href).includes("login")) {
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
