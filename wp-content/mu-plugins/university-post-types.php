<?php
  function post_types() {
    $eventPostTypeArray = [
      'capability_type' => 'event',
      'map_meta_cap' => true,
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
        'title'
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

    $campusPostTypeArray = [
      'capability_type' => 'campus',
      'map_meta_cap' => true,
      'supports' => [
        'title', 'editor'
      ],
      'has_archive' => true,
      'public' => true,
      'show_in_rest' => true,
      'menu_icon' => 'dashicons-location-alt',
      'labels' => [
        'name' => 'Campus',
        'add_new_item' => 'Add New Campus',
        'edit_item' => 'Edit Campus',
        'all_items' => 'All Campuses',
        'singular_name' => 'Campus'
      ]
    ];
    register_post_type('campus', $campusPostTypeArray);

    $notePostTypeArray = [
      'capability_type' => 'note',
      'map_meta_cap' => true,
      'show_in_rest' => true,
      'supports' => ['title', 'editor'],
      'public' => false,
      'show_ui' => true,
      'labels' => [
        'name' => 'Notes',
        'add_new_item' => 'Add New Note',
        'edit_item' => 'Edit Note',
        'all_items' => 'All Notes',
        'singular_name' => 'Note'
      ],
      'menu_icon' => 'dashicons-welcome-write-blog'
    ];
    register_post_type('note', $notePostTypeArray);

    $likePostTypeArray = [
      'supports' => ['title'],
      'public' => false,
      'show_ui' => true,
      'labels' => [
        'name' => 'Likes',
        'add_new_item' => 'Add New Like',
        'edit_item' => 'Edit Like',
        'all_items' => 'All Likes',
        'singular_name' => 'Like'
      ],
      'menu_icon' => 'dashicons-heart'
    ];

    register_post_type('like', $likePostTypeArray);
  }
  add_action('init', 'post_types');
?>