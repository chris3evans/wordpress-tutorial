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

  function createLike ($data) {
    $professor = sanitize_text_field($data['professorId']);

    return wp_insert_post([
      'post_type' => 'like',
      'post_status' => 'publish',
      'post_title' => 'Create Like Test 2',
      'meta_input' => [
        'liked_professor_id' => $professor
      ]
    ]);
  }

  function deleteLike () {
    return 'deleted';
  }
?>