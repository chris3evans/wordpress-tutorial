<?php
  function generateText($name, $colour) {
    echo "<p>Hi, my name is $name and my favourite colour is $colour. </p>";
  }

  generateText('John', 'blue');
  generateText('Jane', 'green');
?>

<h1><?php bloginfo('name');?></h1>