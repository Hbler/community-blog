//// Imports
import API from "../models/API.js";
import User from "./User.js";

//// Controller
class Layout {
  static loginPage() {
    const body = document.querySelector("body");
    const main = document.createElement("main");

    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    const title = document.createElement("h1");
    const email = document.createElement("input");
    const password = document.createElement("input");
    const loginBtn = document.createElement("input");
    const register = document.createElement("p");

    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.classList.add("close-btn");

    title.innerText = "Login";

    email.placeholder = "Email";
    email.name = "email";
    email.type = "email";

    password.placeholder = "Senha";
    password.name = "password";
    password.type = "password";

    loginBtn.value = "Login";
    loginBtn.type = "submit";
    loginBtn.id = "login";
    loginBtn.classList.add("btn");
    form.addEventListener("submit", User.login);

    register.innerHTML =
      'não tem uma conta?<br><a href="./register.html">cadastre-se aqui</a>';

    [(email, password)].forEach((x) => (x.required = true));

    form.append(closeBtn, title, email, password, loginBtn, register);
    main.appendChild(form);
    body.appendChild(main);
  }

  static registerPage() {
    const body = document.querySelector("body");
    const main = document.createElement("main");

    const form = document.createElement("form");
    const closeBtn = document.createElement("button");
    const title = document.createElement("h1");
    const userName = document.createElement("input");
    const email = document.createElement("input");
    const photo = document.createElement("input");
    const password = document.createElement("input");
    const regBtn = document.createElement("input");

    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", () => {
      history.back();
    });

    title.innerText = "Cadastro";

    userName.placeholder = "Nome de Usuário";
    userName.name = "username";
    userName.type = "text";

    email.placeholder = "Email";
    email.name = "email";
    email.type = "email";

    photo.placeholder = "Foto do Perfil";
    photo.name = "avatarUrl";
    photo.type = "text";

    password.placeholder = "Senha";
    password.name = "password";
    password.type = "password";

    regBtn.value = "Cadastrar";
    regBtn.type = "submit";
    regBtn.id = "register";
    regBtn.classList.add("btn");
    form.addEventListener("submit", User.sendNew);

    [(userName, email, photo, password)].forEach((x) => (x.required = true));

    form.append(closeBtn, title, userName, email, photo, password, regBtn);
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
    logoutBtn.addEventListener("click", User.logout);

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
    postBtn.addEventListener("click", User.newPost);

    newPost.append(postInput, postBtn);

    const allPosts = document.createElement("section");
    Layout.postsPage(allPosts, 1);
    allPosts.classList.add("main__all-posts");

    const pagination = Layout.createPagination();

    main.classList.add("blog__main");
    main.append(newPost, pagination, allPosts);
    body.append(header, main);
  }

  static aPost(id, src, usr, str, date, bool) {
    const container = document.createElement("article");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const txt = document.createElement("p");
    const edit = document.createElement("input");
    const editBtn = document.createElement("button");
    const postDate = document.createElement("small");

    img.src = src;
    img.classList.add("post__img");

    name.innerText = usr;
    name.classList.add("post__username");

    txt.innerText = str;
    txt.classList.add("post__content");

    edit.type = "text";
    edit.classList.add("post__edit", "clear");
    edit.placeholder = "Digite o novo post";

    editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    editBtn.classList.add("btn", "btn__edit", "clear");
    editBtn.dataset.id = id;
    editBtn.addEventListener("click", User.updatePost);

    postDate.innerText = date;
    postDate.classList.add("post__date");

    container.append(img, name, txt, edit, editBtn, postDate);

    if (bool) {
      const btns = document.createElement("div");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editBtn.dataset.id = id;
      editBtn.addEventListener("click", User.startEdit);

      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteBtn.dataset.id = id;
      deleteBtn.addEventListener("click", User.deletePost);

      btns.append(editBtn, deleteBtn);
      btns.classList.add("post__btns");

      container.appendChild(btns);
    }

    container.classList.add("post");
    container.id = id;

    return container;
  }

  static async postsPage(parent, page) {
    parent.innerHTML = "";
    const aPage = await API.postsAtPage(page);
    const posts = aPage.data;

    localStorage.setItem("page", aPage.page);
    localStorage.setItem("lastPage", aPage.lastPage);

    if (aPage.page !== aPage.lastPage) {
      localStorage.setItem("nextPage", aPage.page + 1);
    }
    if (aPage.page !== 1) {
      localStorage.setItem("previousPage", aPage.page - 1);
    }

    posts.forEach((p) => {
      const { id, post, createdAt, owner } = p;
      const bool = localStorage.getItem("userId") === owner.id;
      const date = createdAt.split("-").reverse().join("/");

      const aPost = Layout.aPost(
        id,
        owner.avatarUrl,
        owner.username,
        post,
        date,
        bool
      );
      parent.appendChild(aPost);
    });
  }

  static changePage(e) {
    const postList = document.querySelector(".main__all-posts");
    const page = e.target.dataset.number;

    Layout.postsPage(postList, +page);
  }

  static createPagination() {
    const container = document.createElement("div");
    const lastPage = localStorage.getItem("lastPage");

    for (let p = 1; p <= +lastPage; p++) {
      const num = document.createElement("small");
      num.dataset.number = p;
      num.innerText = p;
      num.addEventListener("click", Layout.changePage);

      container.appendChild(num);
    }

    container.classList.add("main__pagination");

    return container;
  }
}

//// Exports
export default Layout;
