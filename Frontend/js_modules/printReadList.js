import { books } from "./printBooks.js";
import { addBookRated } from "./addBookRated.js";


export const printReadList = async () => {
    const res = await fetch(`http://localhost:1337/api/Users/${sessionStorage.getItem("id")}?populate=*`);
    const data = await res.json();
    
    const readList = Array.from(data.readList)
    readList.forEach(el => {
      let listId;
      if (el.id === 1) {
        listId = el.id - 1;
      } else {
        listId = el.id - 2;
      }
        const article = document.createElement("article")
        article.innerHTML = `
    <section id="left__section">
    <img src="./bilder/${books[listId].attributes.cover.data.attributes.name}">
    </section>
    <section id="right__section">
    <span>
    <h4>${el.title}</h4>
    <h5>${el.author}</h5>
    </span>
        <span id="section_below">
        <span id="left_below">
        <p>Sidor: ${el.pages}</p>
        <h6>Publicerad: ${el.published}</h6>
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

        if (Math.round(el.rating) === 5) {
          let index;
          for (index = 1; index <= 5; index++) {
            const i = document.createElement("i");
            i.setAttribute("data-index", index)
            i.classList.add("rating__star")
            i.classList.add("fa-solid")
            i.classList.add("fa-star")
            starRating.append(i);
          }
          const p = document.createElement('p').innerHTML = `(${el.rates})`
          starRating.append(p)
        }
        if (Math.round(el.rating) === 4) {
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
          const p = document.createElement('p').innerHTML = `(${el.rates})`
          starRating.append(p)
        }
        if (Math.round(el.rating) === 3) {
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
          const p = document.createElement('p').innerHTML = `(${el.rates})`
          starRating.append(p)
        }
        if (Math.round(el.rating) === 2) {
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
          const p = document.createElement('p').innerHTML = `(${el.rates})`
          starRating.append(p)
        }
        if (Math.round(el.rating) === 1) {
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
          const p = document.createElement('p').innerHTML = `(${el.rates})`
          starRating.append(p)
        }
        if (el.rating === null) {
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
    function executeRating(stars, starIndex, bookId) {             
      const starClassActive = "rating__star fa-solid fa-star";
      const starClassInactive = "rating__star fa-regular fa-star";
      const starsLength = stars.length;
      let i;
      console.log(starIndex)
      stars.map((star) => {
        i = starIndex;
        if (star.className === starClassInactive) {
          for (i; i >= 0; --i) stars[i].className = starClassActive;
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
                const index = event.target.dataset.index -1;
                console.log(index)
                const book = event.currentTarget.dataset.index
                parentList = [...event.currentTarget.children]
                executeRating(parentList, index, book)
              })
            });
            
            const review = async (bookId, rate) => {
              const getBook = (e) => e.id == bookId;
              const selectedBook = books.findIndex(getBook)
      
              const res = await fetch(`http://localhost:1337/api/book-lists/${bookId}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    rating: (books[selectedBook].attributes.rating + rate) / books[selectedBook].attributes.rates,
                    rates : books[selectedBook].attributes.rates + 1,
                  }
                }),
              });
              addBookRated(bookId);
            }
}