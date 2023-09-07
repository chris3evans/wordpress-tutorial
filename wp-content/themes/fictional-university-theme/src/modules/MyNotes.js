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
    $.ajax({
      beforeSend: (x) => {
        x.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + `/wp-json/wp/v2/note/99`,
      type: "DELETE",
      success: (response) => {
        console.log("deleted");
        console.log(response);
      },
      error: (error) => {
        console.log("failed");
        console.log(error);
      },
    });
  }
}

export default MyNotes;
