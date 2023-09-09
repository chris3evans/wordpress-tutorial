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
    console.log("create like message");
  }

  deleteLike() {
    console.log("delete like message");
  }
}

export default Likes;
