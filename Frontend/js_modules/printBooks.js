import { addBookRated } from "./addBookRated.js";

export let books

export const printBooks = async () => {
  if (document.querySelector("#content_header")) {
    document.querySelector("#content_header").innerHTML = "";
  }
  
    content.innerHTML = "";
    const res = await fetch("http://localhost:1337/api/book-lists?populate=*");
    const data = await res.json();
    
    books = Array.from(data.data)

    books.forEach(el => {
        const article = document.createElement("article")

        article.innerHTML = `
        <section id="left__section">
        <img src="./bilder/${el.attributes.cover.data.attributes.name}">
        </section>
        <section id="right__section">
        <span>
        <h4>${el.attributes.title}</h4>
        <h5>${el.attributes.author}</h5>
        </span>
            <span id="section_below">
            <span id="left_below">
            <p>Sidor: ${el.attributes.pages}</p>
            <h6>Publicerad: ${el.attributes.published}</h6>
            </span>
            <span id="right_below">
            <i class="plus fa-solid fa-circle-plus" data-id="${el.id}"></i>
            <span class="rating" data-index="${el.id}" id="book${el.id}">
            </span>
        </span>
        </span>
        </section>
        `;
        content.append(article)
        const starRating = document.getElementById(`book${el.id}`);

        if (Math.round(el.attributes.rating) === 5) {
          let index;
          for (index = 1; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.attributes.rates})`
          starRating.append(p)
        }
        if (Math.round(el.attributes.rating) === 4) {
          let index;
          for (index = 1; index <= 4; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          } 
          for (index; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-regular")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.attributes.rates})`
          starRating.append(p)
        }
        if (Math.round(el.attributes.rating) === 3) {
          let index;
          for (index = 1; index <= 3; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          } 
          for (index; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-regular")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.attributes.rates})`
          starRating.append(p)
        }
        if (Math.round(el.attributes.rating) === 2) {
          let index;
          for (index = 1; index <= 2; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          } 
          for (index; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-regular")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.attributes.rates})`
          starRating.append(p)
        }
        if (Math.round(el.attributes.rating) === 1) {
          let index;
          for (index = 1; index <= 1; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          } 
          for (index; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-regular")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.attributes.rates})`
          starRating.append(p)
        }
        if (el.attributes.rating === null) {
          for (let index = 1; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-regular")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(0)`
          starRating.append(p)
        }
      });
      let addBook = async (bookId) => {
        let res = await fetch(`http://localhost:1337/api/Users/${sessionStorage.getItem("id")}?populate=*`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              readList: {
                connect: [Number(bookId)],
              },
          }),
        });
           console.log(res)
       };
      let plus = [...document.querySelectorAll(".plus")]
      plus.forEach(plusTecken => {
        plusTecken.addEventListener("click", function(event){
          addBook(event.target.dataset.id)
        })
      })
      function executeRating(stars, starIndex, bookId) {             
const starClassActive = "rating__star fa-solid fa-star";
const starClassInactive = "rating__star fa-regular fa-star";
const starsLength = stars.length;
let i;
stars.map((star) => {
  i = starIndex;
  if (star.className === starClassInactive) {
    for (i; i >= 0; --i) {stars[i].className = starClassActive};
  } else {
    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
  }
});
review(bookId, starIndex)
};

let ratings = [...document.querySelectorAll(".rating")]
let parentList = []
ratings.forEach(rating => {

  rating.addEventListener("click", function(event) {
          const index = event.target.dataset.index - 1;
          const book = event.currentTarget.dataset.index
          parentList = [...event.currentTarget.children]
          executeRating(parentList, index, book)
        })
      });
      
      const review = async (bookId, rate) => {
        const getBook = (e) => e.id == bookId;
        const selectedBook = books.findIndex(getBook)
        console.log(rate + 1)

        const res = await fetch(`http://localhost:1337/api/book-lists/${bookId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              rating: (books[selectedBook].attributes.rating + (rate + 1)) / books[selectedBook].attributes.rates,
              rates : books[selectedBook].attributes.rates + 1,
            }
          }),
        });
        addBookRated(bookId);
      }
      
}