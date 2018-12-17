<?php

session_start();

require('model.php');
require('Class/Validator.php');

if (isset($_GET['action'])) {
    # code...
    if ($_GET['action'] === 'read') {
        include('sendstory.php');
    } elseif ($_GET['action'] === 'send') {
        include('registerstory.php');
    } else {
        die();
    }

} else {
    die();
}

session_destroy();