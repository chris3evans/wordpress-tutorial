import $ from "jquery";

class Likes {
  constructor() {
    this.events();
  }

  events() {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  // methods
  ourClickDispatcher(event) {
    const currentLikeBox = $(event.target).closest(".like-box");

    if (currentLikeBox.data("exists") === "yes") {
      this.deleteLike();
    } else {
      this.createLike();
    }
  }

  createLike() {
    $.ajax({
      url: `${universityData.root_url}/wp-json/university/v1/manageLike`,
      type: "POST",
      success: (success) => {
        console.log(success, "success");
      },
      error: (error) => {
        console.log(error, "error");
      },
    });
  }

  deleteLike() {
    $.ajax({
      url: `${universityData.root_url}/wp-json/university/v1/manageLike`,
      type: "DELETE",
      success: (success) => {
        console.log(success, "success");
      },
      error: (error) => {
        console.log(error, "error");
      },
    });
  }
}

export default Likes;
