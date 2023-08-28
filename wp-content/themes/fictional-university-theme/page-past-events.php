<?php
  get_header();
  pageBanner([
    'title' => 'Past Events',
    'subtitle' => 'A recap of our past events.'
  ])
?>

<div class="container container--narrow page-section">
  <?php
    $today = date('Ymd');
    $pastEventsCustomQuery = new WP_Query([
      'paged' => get_query_var('paged', 1),
      'post_type' => 'event',
      'meta_key' => 'event_date',
      'orderby' => 'meta_value_num',
      'order' => 'ASC',
      'meta_query' => [
        [
          'key' => 'event_date',
          'compare' => '<',
          'value' => $today,
          'type' => 'numeric'
        ]
      ]
    ]);

    while ($pastEventsCustomQuery -> have_posts()) {
      $pastEventsCustomQuery -> the_post();
      get_template_part('template-parts/content', 'event');
    }

    echo paginate_links([
      'total' => $pastEventsCustomQuery -> max_num_pages
    ]);
?>
</div>

<?php get_footer();?>