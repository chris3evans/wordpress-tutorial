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
      }/wp-json/wp/v2/posts?search=${this.searchField.val()}`,
      (posts) => {
        $.getJSON(
          `${
            universityData.root_url
          }/wp-json/wp/v2/pages?search=${this.searchField.val()}`,
          (pages) => {
            const combinedResults = posts.concat(pages);
            const html = `
            <h2 class="search-overlay__section-title">General Information</h2>
              ${
                combinedResults.length === 0
                  ? "<p>No matching search results</p>"
                  : `<ul class="link-list min-list">
                  ${combinedResults
                    .map((post) => {
                      return `
                      <li><a href="${post.link}">${post.title.rendered}</a></li>
                    `;
                    })
                    .join("")}
                </ul>`
              }
            `;
            this.searchResults.html(html);
            this.isSpinnerVisible = false;
          }
        );
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
