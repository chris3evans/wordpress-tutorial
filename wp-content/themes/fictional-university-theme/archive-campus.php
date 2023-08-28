<?php
  get_header();
  pageBanner([
    'title' => 'Our Campuses',
    'subtitle' => 'We have several conveniently located campuses.'
  ])
?>

<div class="container container--narrow page-section">
  <div class="acf-map">
  <?php
    $programTypeQuery = new WP_Query();
    while (have_posts()) {
      the_post();
      $mapLocation = get_field('map_location');
  ?>
    <div data-lat="<?php echo $mapLocation['lat'];?>" data-lng="<?php echo $mapLocation['lng'];?>" class="marker">

    </div>
<?php }?>
  </div>
</div>

<?php get_footer();?>