<?php

$res = array(
  'loaded' => true,
  'msg'    => 'Hello there!'
);

header('HTTP/1.1 200 OK');
header('Content-type: application/json');
echo json_encode($res);
exit();
