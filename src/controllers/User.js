//// Imports
import API from "../models/API.js";
import Form from "./Form.js";
import Layout from "./layout.js";

//// Model
class User {
  static async sendNew(e) {
    e.preventDefault();

    const body = Form.handleSubmit(e.target);

    let test = await API.newUser(body);
    console.log(test);
    self.location = "./login.html";
  }

  static async login(e) {
    e.preventDefault();

    const body = Form.handleSubmit(e.target);

    const auth = await API.userLogin(body);

    if (auth.token) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("userId", auth.userId);
      const user = await API.anUser(auth.userId);

      if (user.id) {
        localStorage.setItem("username", user.username);
        localStorage.setItem("avatar", user.avatarUrl);

        self.location = "./main.html";
      }
    }
  }

  static logout() {
    localStorage.clear();
    self.location = "./login.html";
  }

  static async newPost() {
    const postList = document.querySelector(".main__all-posts");
    const input = document.getElementById("content");
    const body = { content: input.value };
    const page = localStorage.getItem("page");

    input.value = "";

    const request = await API.newPost(body);
    Layout.postsPage(postList, page);
  }

  static startEdit(e) {
    const id = e.target.dataset.id || e.target.closest("button").dataset.id;
    const post = document.getElementById(id);
    const current = post.querySelector(".post__content");
    const input = post.querySelector(".post__edit");
    const btn = post.querySelector(".btn__edit");

    current.classList.toggle("clear");
    input.classList.toggle("clear");
    btn.classList.toggle("clear");
  }

  static async updatePost(e) {
    const id = e.target.dataset.id || e.target.closest("button").dataset.id;
    const post = document.getElementById(id);
    const input = post.querySelector(".post__edit");
    const body = { newContent: input.value };
    const postList = document.querySelector(".main__all-posts");
    const page = localStorage.getItem("page");

    const request = await API.editPost(body, id);
    Layout.postsPage(postList, page);
  }

  static async deletePost(e) {
    const postID = e.target.dataset.id || e.target.closest("button").dataset.id;
    const postList = document.querySelector(".main__all-posts");
    const page = localStorage.getItem("page");

    const request = await API.deletPost(postID);
    Layout.postsPage(postList, +page);
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
