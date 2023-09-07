import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
  }

  // methods
  deleteNote() {
    alert("hello there");
  }
}

export default MyNotes;
