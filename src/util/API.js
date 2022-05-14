//// Model
class API {
  static baseURL = "https://api-blog-m2.herokuapp.com/";
  static forUser = "user/";
  static forPost = "post/";
  static token = "";

  static async newUser(obj) {
    const userURL = API.baseURL + API.forUser;
    const req = await fetch(userURL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return req;
  }

  static async userLogin(obj) {
    const userURL = API.baseURL + API.forUser;
    const req = await fetch(userURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    if (req.token) {
      API.token = req.token;
    }
    return req;
  }

  static async anUser(id) {
    const userURL = API.baseURL + API.forUser;
    const req = await fetch(userURL + `${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return req;
  }

  static newPost(obj) {
    const req = fetch(API.baseURL + "post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return req;
  }

  static async aPost(id) {
    const postURL = API.baseURL + API.forPost;
    const req = await fetch(postURL + `${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return req;
  }

  static async postsAtPage(page) {
    const req = await fetch(API.baseURL + `post?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return req;
  }

  static editPost(obj, id) {
    const postURL = API.baseURL + API.forPost;
    const req = fetch(postURL + `${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj), // key = newContent
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return req;
  }

  static deletPost(id) {
    const postURL = API.baseURL + API.forPost;
    const req = fetch(postURL + `${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return req;
  }
}

//// Export
export default API;
