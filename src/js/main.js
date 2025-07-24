"use strict";
import "../scss/style.scss";
import articles from "../data/articles.json";

(function () {
  class ArticleList extends HTMLElement {
    articles = [];
    articlesWithImage = ["article-3", "article-4"];

    constructor() {
      super();
      // const shadow = this.attachShadow({ mode: "open" });
      this.articles = articles.data;
      console.log(this.articles);

      const listContainer = document.createElement("div");
      listContainer.classList.add("cards");
      listContainer.id = "cards";

      const articlesHTML = this.articles
        .map((article, i) => {
          const articlesWithNoImage = this.articlesWithImage.includes(
            article.id
          );

          const datePosted = new Date(article.date).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
            }
          );

          return `
        <article class="card" id="${article.id}">
          ${
            !articlesWithNoImage
              ? `
            <figure class="thumb-image">
              <img src="${article.image}" alt="A bee collecting nectar" />
            </figure>
            <div class="overlay"></div>
            `
              : ""
          }
          <div class="content card-background ${
            articlesWithNoImage ? "pull-top" : "bottom"
          }">
            <div class="date-posted">
              <div class="calendar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fill="#6b5b95" fill-rule="evenodd"
                    d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h8.5a.25.25 0 01.25.25V6h-11V3.75a.25.25 0 01.25-.25h2zm-2.25 4v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z"/>
                </svg>
              </div>
              <div class="article-date">${datePosted}</div>
            </div>
            <div class="article-title">
              <h2><a href="#">${article.title}</a></h2>
            </div>
            <div class="article-text">
              <p>${article.description}</p>
            </div>
            <div class="find-out-more ${
              articlesWithNoImage ? "bottom-text" : "bottom-relative-text"
            }">
              <a href="#">Read more</a>
            </div>
          </div>
        </article>
      `;
        })
        .join("");

      listContainer.innerHTML = articlesHTML;
      this.appendChild(listContainer);
    }

    connectedCallback() {
      this.setupHoverEvents();
    }

    setupHoverEvents() {
      this.articlesWithImage.forEach((id) => {
        const article = document.getElementById(id);
        if (article) {
          this.handleHover(article);
        } else {
          console.log(`article id ${id} not found`);
        }
      });
    }

    handleHover(element) {
      console.log(this.articles);
      let hoverBox;

      element.addEventListener("mouseenter", () => {
        hoverBox = document.createElement("div");
        hoverBox.textContent = "Popular";

        Object.assign(hoverBox.style, {
          position: "absolute",
          padding: "8px",
          backgroundColor: "#11263c",
          color: "#ffffff",
          zIndex: 1000,
          borderTopLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        });

        const rect = element.getBoundingClientRect();
        hoverBox.style.top = `${rect.top + window.scrollY}px`;
        hoverBox.style.left = `${rect.left + window.scrollX}px`;
        document.body.appendChild(hoverBox);
      });

      element.addEventListener("mouseleave", () => {
        if (hoverBox) {
          document.body.removeChild(hoverBox);
          hoverBox = null;
        }
      });
    }
  }

  customElements.define("article-list", ArticleList);
})();
