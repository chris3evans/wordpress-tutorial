<?php
  $array = [1, 2, 3, 4, 5];
  $count = 0;

  while ($count < count($array)) {
    echo "<li>The number is now equal to $array[$count]</li>";
    $count++;
  }
?>