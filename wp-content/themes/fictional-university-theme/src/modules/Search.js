import $ from "jquery";

class Search {
  // instantiate object
  constructor() {
    this.searchBtn = $(".js-search-trigger");
    this.searchOverlay = $(".search-overlay");
    this.closeBtn = $(".search-overlay__close");
    this.searchField = $("#search-term");

    this.searchOverlayOpen = false;
    this.typingTimer;

    this.events();
  }

  // events
  events() {
    // "on" method changes value of "this" kw from this instance of Search to whatever HTML element was clicked. Therefore the bind() method is needed:
    this.searchBtn.on("click", this.openOverlay.bind(this));
    this.closeBtn.on("click", this.closeOverlay.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));

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
    if (e.keyCode === 83 && !this.searchOverlayOpen) this.openOverlay();
    if (e.keyCode === 27 && this.searchOverlayOpen) this.closeOverlay();
  }

  typingLogic(e) {
    console.log(e.originalEvent.key);
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(function () {
      console.log("hello there");
    }, 2000);
  }
}

export default Search;
