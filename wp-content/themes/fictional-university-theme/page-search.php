<?php get_header();?>

<?php
  while(have_posts()) {
    the_post();
    pageBanner([
      'title' => 'Search',
      'subtitle' => '',
      'photo' => 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop='
    ]);
?>

<div class="container container--narrow page-section">
  <?php
    $current_page_id = get_the_ID();
    $parent_page_id = wp_get_post_parent_id($current_page_id);

    if ($parent_page_id) { ?>
      <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
          <a class="metabox__blog-home-link" href="<?php echo get_permalink($parent_page_id);?>">
            <i class="fa fa-home" aria-hidden="true"></i>
            Back to <?php echo get_the_title($parent_page_id);?>
          </a>
          <span class="metabox__main"><?php the_title();?></span>
        </p>
      </div>
    <?php } ?>

  <?php
    $currentPages = ['child_of' => get_the_ID()];
    $isParentPage = get_pages($currentPages);
    if ($parent_page_id || $isParentPage) {
  ?>
  <div class="page-links">
    <h2 class="page-links__title">
      <a href="<?php echo get_permalink($parent_page_id);?>"><?php echo get_the_title($parent_page_id);?></a>
    </h2>

    <ul class="min-list">
      <?php
        if ($parent_page_id) {
          $findChildrenOf = $parent_page_id;
        } else {
          $findChildrenOf = $current_page_id;
        }

        $children_list_array = [
          'title_li' => null,
          'child_of' => $findChildrenOf,
          'sort_column' => 'menu_order'
        ];
        wp_list_pages($children_list_array);
      ?>
    </ul>
  </div>
  <?php } ?>

  <div class="generic-content">
    <!-- GET makes sure content of form is added to URL -->
    <?php get_search_form();?>
  </div>
</div>
<?php
  }
?>

<?php get_footer();?>