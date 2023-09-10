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

  function deleteLike ($data) {
    $likeId = sanitize_text_field($data['like']);

    // if the current user id = the id of the user who created the like post
    if (get_current_user_id() === get_post_field('post_author', $likeId) AND get_post_type($likeId) === 'like') {
      wp_delete_post($likeId, true);
      return 'Like deleted';
    } else {
      die("You do not have permission to delete that");
    }
  }
?>