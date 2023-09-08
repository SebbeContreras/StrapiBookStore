
let content = document.getElementById("content");
let inlog = document.querySelector(".login");
const profile = document.querySelector("#sub__profile__pic");

const themeStyle = async () => {
  const res = await fetch("http://localhost:1337/api/index");
  const data = await res.json()
  
  
  if (data.data.attributes.themes === "blue") {
    document.querySelector("header").style.background = "darkblue"
    document.querySelector("header").style.color = "white"
    document.querySelector("aside").style.background = "darkblue"
    document.querySelector("aside").style.color = "white"
  } else if (data.data.attributes.themes === "red") {
    document.querySelector("header").style.background = "darkred"
    document.querySelector("header").style.color = "white"
    document.querySelector("aside").style.background = "darkred"
    document.querySelector("aside").style.color = "white"
  }
  
}
themeStyle();

const userChoice = () => {
  content.innerHTML = `
  <h1>Logga in</h1>
  <form>
  <input type="text" name="username" id="user" placeholder="username">
  <input type="password" name="password" id="pass" placeholder="password" autocomplete="on">
  </form>
  <button type="submit" id="btn__login">Logga in</button>
  <p id="register">Har du inte ett konto? skapa här</p>
  `;
  document.querySelector("#btn__login").addEventListener('click', login)
  let register = () => {
  content.innerHTML = `
  <h1>Registrera</h1>
  <form>
  <input type="text" placeholder="Username" id="username" required></input>
  <input type="email" placeholder="Email" id="email" required></input>
  <input type="password" placeholder="Password" id="password" autocomplete="on" required></input>
  
  <button type="submit" id="btn">Registrera</button>
  </form>`
    const user = document.querySelector("#username")
    const pw = document.querySelector("#password")
    const email = document.querySelector("#email")
const fetchPost = async () => {

  let res = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      username: user.value,
      password: pw.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  userChoice();
}
document.querySelector("#btn").addEventListener("click", fetchPost)
}
document.querySelector("#register").addEventListener("click", register)
}
let login = async () => {
  let username = document.getElementById("user");
  let pass = document.getElementById("pass");
  const res = await fetch("http://localhost:1337/api/auth/local", {
    method: 'POST',
    body: JSON.stringify({
      identifier: username.value,
      password: pass.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  const data =  await res.json();    
  
  sessionStorage.setItem("token", data.jwt);
  sessionStorage.setItem("id", data.user.id);
  sessionStorage.setItem("user", data.user.username);
  inlog.innerHTML = sessionStorage.getItem("user")
  
  document.querySelector("#sub__profile__pic").style.border = "rgb(47, 53, 104) solid  3px"
  document.querySelector("#sub__profile__pic").style.color = "rgb(47, 53, 104)"
  document.querySelector("#logout").classList.remove("hidden")
  inlog.addEventListener("click", profileSite);
  profile.addEventListener("click", profileSite);
  
  checkStatus();
}
const checkStatus = () => {
  if (sessionStorage.getItem("token")) {
    inlog.innerHTML = sessionStorage.getItem("user")
    document.querySelector("#sub__profile__pic").style.border = "rgb(47, 53, 104) solid  3px"
    document.querySelector("#sub__profile__pic").style.color = "rgb(47, 53, 104)"
    document.querySelector("#logout").classList.remove("hidden")
    printBooks()
  } else {
    inlog.innerHTML = "Logga in"
    document.querySelector("#sub__profile__pic").style.border = null
    document.querySelector("#sub__profile__pic").style.color = null
    document.querySelector("#logout").classList.add("hidden")
    inlog.addEventListener('click', userChoice)
    printBooks()
  }
}

import { profileSite } from "./js_modules/profile.js";

import { printBooks } from "./js_modules/printBooks.js";

let logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('id')
  sessionStorage.removeItem('user')

  checkStatus();
}

import { printReadList } from "./js_modules/printReadList.js";


document.querySelector("#books").addEventListener("click", printBooks)
document.querySelector("#logout").addEventListener("click", logout)
checkStatus();