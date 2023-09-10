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
    if (is_user_logged_in()) {
      $professor = sanitize_text_field($data['professorId']);
      $existQuery = new WP_Query([
        'post_type' => 'like',
        'author' => get_current_user_id(),
        'meta_query' => [
          [
            'key' => 'liked_professor_id',
            'compare' => '=',
            'value' => $professor
          ]
        ]
      ]);

      if ($existQuery -> found_posts === 0 AND get_post_type($professor) === 'professor') {
        return wp_insert_post([
          'post_type' => 'like',
          'post_status' => 'publish',
          'post_title' => 'Create Like Test 2',
          'meta_input' => [
            'liked_professor_id' => $professor
          ]
        ]);
      } else {
        die("Invalid professor ID");
      }
    } else {
      die("Only logged in users can create a like");
    }
  }

  function deleteLike () {
    return 'deleted';
  }
?>