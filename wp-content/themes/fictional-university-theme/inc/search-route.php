<?php
  function universityRegisterSearch () {
    register_rest_route('university/v1', 'search', [
      'methods' => WP_REST_SERVER::READABLE,
      'callback' => 'universitySearchResults',
    ]);
  }
  function universitySearchResults () {
    $professors = new WP_Query([
      'post_type' => 'professor',
    ]);
    $professorResults = [];

    while ($professors -> have_posts()) {
      $professors -> the_post();
      array_push($professorResults, [
        'professorTitle' => get_the_title(),
        'professorPermalink' => get_the_permalink()
      ]);
    }
    return $professorResults;
  }

  add_action('rest_api_init', 'universityRegisterSearch');
?>