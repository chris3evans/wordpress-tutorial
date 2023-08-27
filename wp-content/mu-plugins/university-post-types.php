<?php
  function post_types() {
    $eventPostTypeArray = [
      'supports' => [
        'title',
        'editor',
        'excerpt'
      ],
      'has_archive' => true,
      'public' => true,
      'show_in_rest' => true,
      'menu_icon' => 'dashicons-calendar-alt',
      'labels' => [
        'name' => 'Events',
        'add_new_item' => 'Add New Event',
        'edit_item' => 'Edit Event',
        'all_items' => 'All Events',
        'singular_name' => 'Event'
      ],
    ];
    register_post_type('event', $eventPostTypeArray);

    $programPostTypeArray = [
      'supports' => [
        'title',
        'editor'
      ],
      'has_archive' => true,
      'public' => true,
      'show_in_rest' => true,
      'menu_icon' => 'dashicons-book-alt',
      'labels' => [
        'name' => 'Program',
        'add_new_item' => 'Add New Program',
        'edit_item' => 'Edit Program',
        'all_items' => 'All Programs',
        'singular name' => 'Program'
      ]
    ];
    register_post_type('program', $programPostTypeArray);

    $professorPostTypeArray = [
      'supports' => [
        'title', 'editor', 'thumbnail'
      ],
      'public' => true,
      'show_in_rest' => true,
      'menu_icon' => 'dashicons-welcome-learn-more',
      'labels' => [
        'name' => 'Professor',
        'add_new_item' => 'Add New Professor',
        'edit_item' => 'Edit Professor',
        'all_items' => 'All Professors',
        'singular_name' => 'Professor'
      ]
    ];
    register_post_type('professor', $professorPostTypeArray);
  }
  add_action('init', 'post_types');
?>