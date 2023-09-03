<?php
  function universityRegisterSearch () {
    register_rest_route('university/v1', 'search', [
      'methods' => WP_REST_SERVER::READABLE,
      'callback' => 'universitySearchResults',
    ]);
  }
  function universitySearchResults () {
    return 'Hello There';
  }

  add_action('rest_api_init', 'universityRegisterSearch');
?>