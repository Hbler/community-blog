//// Imports
import API from "../util/API.js";
import FormController from "./FormController.js";

//// Model
class UserController {
  static async sendNew(e) {
    e.preventDefault();

    const body = FormController.handleSubmit(e.target);

    let test = await API.newUser(body);
    console.log(test);
    self.location = "./login.html";
  }

  static async login(e) {
    e.preventDefault();

    const body = FormController.handleSubmit(e.target);

    const auth = await API.userLogin(body);

    if (auth.token) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("userId", auth.userId);
      const user = await API.anUser(auth.userId);

      if (user.id) {
        localStorage.setItem("username", user.username);
        localStorage.setItem("avatar", user.avatarUrl);

        const checkUsr = await API.anUser(user.id);

        if (checkUsr.email === body.email) self.location = "./main.html";
      }
    }
  }

  static logout() {
    localStorage.clear();
    self.location = "./login.html";
  }
}

//// Exports
export default UserController;
