import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote.bind(this));
    $(".edit-note").on("click", this.editNote.bind(this));
    $(".update-note").on("click", this.updateNote.bind(this));
    $(".submit-note").on("click", this.createNote.bind(this));
  }

  // methods
  editNote(event) {
    const thisNote = $(event.target).parents("li");

    if (thisNote.data("state") === "editable") {
      this.makeNoteReadOnly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }

  updateNote(event) {
    const thisNote = $(event.target).parents("li");

    const updatedPostData = {
      title: thisNote.find(".note-title-field").val(),
      content: thisNote.find(".note-body-field").val(),
    };

    $.ajax({
      beforeSend: (x) => {
        x.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url:
        universityData.root_url + `/wp-json/wp/v2/note/${thisNote.data("id")}`,
      type: "POST",
      data: updatedPostData,
      success: (response) => {
        console.log(response);
        this.makeNoteReadOnly(thisNote);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createNote(event) {
    const newPostData = {
      title: $(".new-note-title").val(),
      content: $(".new-note-body").val(),
      status: "publish",
    };

    $.ajax({
      beforeSend: (x) => {
        x.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + "/wp-json/wp/v2/note/",
      type: "POST",
      data: newPostData,
      success: (response) => {
        console.log(response);
        $(".new-note-title, .new-note-body").val("");
        $("<li>Imagine real data here</li>")
          .prepend("#my-notes")
          .hide()
          .slideDown();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  makeNoteEditable(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');

    thisNote
      .find(".note-title-field, .note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");

    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state", "editable");
  }

  makeNoteReadOnly(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');

    thisNote
      .find(".note-title-field, .note-body-field")
      .attr("readonly", "readonly")
      .removeClass("note-active-field");

    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state", "cancel");
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
