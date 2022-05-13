//// Imports
import PostController from "../controllers/PostController.js";

//// Model
class Post {
  constructor(id, src, usr, str, date) {
    this.id = id;
    this.src = src;
    this.usr = usr;
    this.str = str;
    this.date = date;
  }

  render(bool) {
    const container = document.createElement("article");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const txt = document.createElement("p");
    const postDate = document.createElement("small");
    const { edit, editBtn } = this.postEditor();
    const btns = this.postBtns();

    img.src = this.src;
    img.classList.add("post__img");

    name.innerText = this.usr;
    name.classList.add("post__username");

    txt.innerText = this.str;
    txt.classList.add("post__content");

    postDate.innerText = this.date;
    postDate.classList.add("post__date");

    container.append(img, name, txt);
    if (bool) container.append(edit, editBtn);
    container.appendChild(postDate);
    if (bool) container.appendChild(btns);
    container.classList.add("post");
    container.id = this.id;

    return container;
  }

  postBtns() {
    const btns = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.dataset.id = this.id;
    editBtn.addEventListener("click", PostController.startEdit);

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.dataset.id = this.id;
    deleteBtn.addEventListener("click", PostController.deletePost);

    btns.append(editBtn, deleteBtn);
    btns.classList.add("post__btns");

    return btns;
  }

  postEditor() {
    const edit = document.createElement("input");
    const editBtn = document.createElement("button");

    edit.type = "text";
    edit.classList.add("post__edit", "clear");
    edit.placeholder = "Digite o novo post";

    editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    editBtn.classList.add("btn", "btn__edit", "clear");
    editBtn.dataset.id = this.id;
    editBtn.addEventListener("click", PostController.updatePost);

    return { edit, editBtn };
  }
}

//// Exports
export default Post;
