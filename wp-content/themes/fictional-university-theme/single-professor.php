<?php get_header();?>

<?php
  while(have_posts()) {
    the_post();
    pageBanner();
?>
  <div class="container container--narrow page-section">
    <div class="generic-content">
      <div class="row group">
        <div class="one-third">
          <?php the_post_thumbnail('professorPortrait');?>
        </div>
        <div class="two-thirds">
          <?php
            $likeCount = new WP_Query([
              'post_type' => 'like',
              'meta_query' => [
                [
                  'key' => 'liked_professor_id',
                  'compare' => '=',
                  'value' => get_the_ID()
                ]
              ]
            ]);

            $existStatus = 'no';

            $existQuery = new WP_Query([
              'post_type' => 'like',
              'author' => get_current_user_id(),
              'meta_query' => [
                [
                  'key' => 'liked_professor_id',
                  'compare' => '=',
                  'value' => get_the_ID()
                ]
              ]
            ]);

            if ($existQuery -> found_posts) {
              $existStatus = 'yes';
            }
          ?>

          <span class="like-box" data-exists="<?php echo $existStatus;?>">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
            <span class="like-count"><?php echo $likeCount -> found_posts;?></span>
          </span>
          <?php the_content();?>
        </div>
      </div>
    </div>
    <?php
      $relatedPrograms = get_field('related_program');

      if ($relatedPrograms) {
        echo "<hr class='section-break'>";
        echo "<h2 class='headline headline--medium'>Subject(s) Taught</h2>";
        echo "<ul class='link-list min-list'>";
        foreach($relatedPrograms as $relatedProgram) {
    ?>
        <li>
          <a href="<?php echo get_the_permalink($relatedProgram);?>"><?php echo get_the_title($relatedProgram);?></a>
        </li>
    <?php }
        echo "</ul>";
      }
    ?>
  </div>
<?php
  }
?>

<?php get_footer();?>