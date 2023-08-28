import $ from "jquery";

class Search {
  // instantiate object
  constructor() {
    this.searchBtn = $(".js-search-trigger");
    this.searchOverlay = $(".search-overlay");
    this.closeBtn = $(".search-overlay__close");
    this.events();
  }

  // events
  events() {
    // "on" method changes value of "this" kw from this instance of Search to whatever HTML element was clicked. Therefore the bind() method is needed:
    this.searchBtn.on("click", this.openOverlay.bind(this));
    this.closeBtn.on("click", this.closeOverlay.bind(this));
  }

  // methods
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
  }
}

export default Search;
