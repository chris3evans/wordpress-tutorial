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

    // use the attr() method to always get the latest attribute value
    if (currentLikeBox.attr("data-exists") === "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: `${universityData.root_url}/wp-json/university/v1/manageLike`,
      type: "POST",
      data: {
        professorId: currentLikeBox.data("professor"),
      },
      success: (success) => {
        let likeCount = +currentLikeBox.find(".like-count").html();
        currentLikeBox.attr("data-exists", "yes");
        likeCount++;
        currentLikeBox.find(".like-count").html(likeCount);
        // if successful, will return the ID of the new like post created
        currentLikeBox.attr("data-like", success);

        console.log(success, "success");
      },
      error: (error) => {
        console.log(error, "error");
      },
    });
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: `${universityData.root_url}/wp-json/university/v1/manageLike`,
      data: {
        like: currentLikeBox.attr("data-like"),
      },
      type: "DELETE",
      success: (success) => {
        let likeCount = +currentLikeBox.find(".like-count").html();
        currentLikeBox.attr("data-exists", "no");
        likeCount--;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", "");

        console.log(success, "success");
      },
      error: (error) => {
        console.log(error, "error");
      },
    });
  }
}

export default Likes;
