<?php
  function post_types() {
    $eventPostTypeArray = [
      'public' => true,
      'menu_icon' => 'dashicons-calendar-alt',
      'labels' => [
        'name' => 'Events',
        'add_new_item' => 'Add New Event',
        'edit_item' => 'Edit Event',
        'all_items' => 'All Events',
        'singular_name' => 'Event'
      ],
    ];
    register_post_type('Event', $eventPostTypeArray);
  }
  add_action('init', 'post_types');
?>