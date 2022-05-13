//// Imports
import FormController from "./FormController.js";
import UserController from "./UserController.js";
import PostController from "./PostController.js";

//// Controller
class LayoutController {
  static loginPage() {
    const body = document.querySelector("body");
    const main = document.createElement("main");

    const form = FormController.loginForm();

    main.appendChild(form);
    body.appendChild(main);
  }

  static registerPage() {
    const body = document.querySelector("body");
    const main = document.createElement("main");

    const form = FormController.registerForm();

    main.appendChild(form);
    body.appendChild(main);
  }

  static mainPage() {
    const body = document.querySelector("body");
    const header = document.createElement("header");
    const main = document.createElement("main");

    const img = document.createElement("img");
    const name = document.createElement("h1");
    const logoutBtn = document.createElement("button");

    img.classList.add("header__img");
    img.src = localStorage.getItem("avatar");

    name.classList.add("header__username");
    name.innerText = localStorage.getItem("username");

    logoutBtn.innerHTML =
      '<i class="fa-solid fa-arrow-right-from-bracket"></i>';
    logoutBtn.id = "logout";
    logoutBtn.classList.add("btn");
    logoutBtn.addEventListener("click", UserController.logout);

    header.append(img, name, logoutBtn);

    const newPost = document.createElement("section");
    const postInput = document.createElement("input");
    const postBtn = document.createElement("button");

    newPost.classList.add("main__new-post");

    postInput.classList.add("main__new-post--input");
    postInput.placeholder = "Crie um post !";
    postInput.id = "content";

    postBtn.innerHTML = '<i class="fa-solid fa-square-plus"></i>';
    postBtn.classList.add("btn");
    postBtn.addEventListener("click", PostController.newPost);

    newPost.append(postInput, postBtn);

    const allPosts = document.createElement("section");
    PostController.postsPage(allPosts, 1);

    allPosts.classList.add("main__all-posts");

    const pagination = PostController.createPagination();

    main.classList.add("blog__main");
    main.append(newPost, pagination, allPosts);
    body.append(header, main);

    LayoutController.currentPage();
  }

  static changePage(e) {
    const postList = document.querySelector(".main__all-posts");
    const page = e.target.dataset.number;

    PostController.postsPage(postList, +page);
  }

  static currentPage() {
    const container = document.querySelector(".main__pagination");
    const pages = container.childNodes;
    const current = localStorage.getItem("page");

    pages.forEach((node) => {
      node.classList.remove(...node.classList);
      if (current == node.textContent) node.classList.add("active");
    });
  }
}

//// Exports
export default LayoutController;
