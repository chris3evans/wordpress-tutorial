import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
    $(".edit-note").on("click", this.editNote);
  }

  // methods
  editNote(event) {
    const thisNote = $(event.target).parents("li");

    thisNote
      .find(".note-title-field, .note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");

    thisNote.find(".update-note").addClass("update-note--visible");
  }

  deleteNote(event) {
    const thisNote = $(event.target).parents("li");

    $.ajax({
      beforeSend: (x) => {
        x.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url:
        universityData.root_url + `/wp-json/wp/v2/note/${thisNote.data("id")}`,
      type: "DELETE",
      success: (response) => {
        console.log(response);
        thisNote.slideUp();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

export default MyNotes;
