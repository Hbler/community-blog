//// Imports
import API from "../models/API.js";
import Form from "./Form.js";

//// Model
class User {
  static async sendNew(e) {
    e.preventDefault();

    const body = Form.handleSubmit(e.target);

    let test = await API.newUser(body);
    console.log(test);
    self.location = "../../index.html";
  }

  static async login(e) {
    e.preventDefault();

    const body = Form.handleSubmit(e.target);

    const auth = await API.userLogin(body);

    if (auth.token) {
      localStorage.setItem("token", auth.token);
      const user = await API.anUser(auth.userId);

      if (user.id) {
        localStorage.setItem("username", user.username);
        localStorage.setItem("avatar", user.avatarUrl);

        self.location = "./src/pages/main.html";
      }
    }
  }

  static logout() {
    localStorage.clear();
    self.location = "../../index.html";
  }

  static newPost(e) {
    const body = Form.handleSubmit(e.target);
  }
}

//// Exports
export default User;

/*
avatarUrl: "https://avatars.githubusercontent.com/u/6564430"
email: "mail@test.com"
id: "684b0838-815c-4951-9ffc-7af5245c1ddc"
username: "hbler"
*/
