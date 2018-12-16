<?php

try {
    $db = new PDO('mysql:host=localhost; dbname=test; charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Error : ' .$e->getMessage());
}
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);