import $ from "jquery";

class Search {
  // instantiate object
  constructor() {
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
    // this.searchResults.html("<h1>Hello There</h1>");
    // this.isSpinnerVisible = false;
    $.getJSON(
      `http://fictional-university.local/wp-json/wp/v2/posts?search=${this.searchField.val()}`,
      function (posts) {
        console.log(posts, "posts");
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
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.searchResults.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }
}

export default Search;
