<?php
  function universityLikeRoutes () {
    register_rest_route('university/v1', 'manageLike', [
      'methods' => 'POST',
      'callback' => 'createLike',
    ]);

    register_rest_route('university/v1', 'manageLike', [
      'methods' => 'DELETE',
      'callback' => 'deleteLike',
    ]);
  }
  add_action('rest_api_init', 'universityLikeRoutes');

  function createLike () {
    return 'created';
  }

  function deleteLike () {
    return 'deleted';
  }
?>