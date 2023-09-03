import $ from "jquery";

class Search {
  // instantiate object
  constructor() {
    this.addSearchHTML();
    this.searchBtn = $(".js-search-trigger");
    this.searchOverlay = $(".search-overlay");
    this.closeBtn = $(".search-overlay__close");
    this.searchField = $("#search-term");
    this.searchResults = $("#search-overlay__results");

    this.searchOverlayOpen = false;
    // stop a new loader being rendered each time the user types
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;

    this.events();
  }

  // events
  events() {
    // "on" method changes value of "this" kw from this instance of Search to whatever HTML element was clicked. Therefore the bind() method is needed:
    this.searchBtn.on("click", this.openOverlay.bind(this));
    this.closeBtn.on("click", this.closeOverlay.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));

    $(document).on("keydown", this.keyPressDispatcher.bind(this));
  }

  // methods
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    setTimeout(() => this.searchField.focus(), 301);
    this.searchField.val("");
    this.searchOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.searchOverlayOpen = false;
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode === 83 &&
      !this.searchOverlayOpen &&
      !$("input, textarea").is(":focus")
    )
      this.openOverlay();
    if (
      e.keyCode === 27 &&
      this.searchOverlayOpen &&
      !$("input, textarea").is(":focus")
    )
      this.closeOverlay();
  }

  getResults() {
    $.getJSON(
      `${
        universityData.root_url
      }/wp-json/university/v1/search?term=${this.searchField.val()}`,
      (results) => {
        const html = `
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${
              results.generalInfo.length === 0
                ? "<p>No matching search results</p>"
                : `<ul class="link-list min-list">
              ${results.generalInfo
                .map((item) => {
                  return `
                    <li>
                      <a href="${item.permalink}">${item.title}</a>
                      ${item.postType === "post" ? `by ${item.authorName}` : ""}
                    </li>
                  `;
                })
                .join("")}
            </ul>`
            }
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${
              results.programs.length === 0
                ? `<p>No matching programs.
                      <a href="${universityData.root_url}/program">View all programs</a>
                   </p>`
                : `<ul class="link-list min-list">
                ${results.programs
                  .map((program) => {
                    return `
                    <li>
                      <a href="${program.permalink}">${program.title}</a>
                    </li>
                  `;
                  })
                  .join("")}
                  </ul>`
            }

            <h2 class="search-overlay__section-title">Professors</h2>
            ${
              results.professors.length === 0
                ? "<p>No matching professors</p>"
                : `<ul class="professor-cards">
                ${results.professors
                  .map((professor) => {
                    return `
                    <li class="professor-card__list-item">
                      <a class="professor-card" href="${professor.permalink}">
                        <img class="professor-card__image" src="${professor.image}">
                        <span class="professor-card__name">${professor.title}</span>
                      </a>
                    </li>
                  `;
                  })
                  .join("")}
                  </ul>`
            }
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${
              results.campuses.length === 0
                ? `<p>No matching campuses.
                      <a href="${universityData.root_url}/campus">View all campuses</a>
                   </p>`
                : `<ul class="link-list min-list">
                  ${results.campuses
                    .map((campus) => {
                      return `
                      <li>
                        <a href="${campus.permalink}">${campus.title}</a>
                      </li>
                    `;
                    })
                    .join("")}
                </ul>`
            }

            <h2 class="search-overlay__section-title">Events</h2>
            ${
              results.events.length === 0
                ? `<p>No matching events.
                    <a href="${universityData.root_url}/event">View all events</a>
                   </p>`
                : `<ul>
                  ${results.events.map((event) => {
                    return `
                      <div class="event-summary">
                        <a class="event-summary__date t-center" href="${event.permalink}">
                          <span class="event-summary__month">${event.month}</span>
                          <span class="event-summary__day">${event.day}</span>
                        </a>
                        <div class="event-summary__content">
                          <h5 class="event-summary__title headline headline--tiny"><a href="${event.permalink}">${event.title}</a></h5>
                          <p>${event.description}
                            <a href="${event.permalink}" class="nu gray"> Learn more</a>
                          </p>
                        </div>
                      </div>
                    `;
                  })}
                </ul>`
            }
          </div>
        </div>
      `;
        this.isSpinnerVisible = false;
        this.searchResults.html(html);
      }
    );
  }

  typingLogic() {
    if (this.searchField.val() !== this.previousValue) {
      // display spinning loader until search results are rendered
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.searchResults.html("<div class='spinner-loader'></div>");
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.searchResults.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }

  addSearchHTML() {
    $("body").append(`
      <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input autocomplete="off" id="search-term" type="text" class="search-term" placeholder="What are you looking for?"/>
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>
    `);
  }
}

export default Search;
