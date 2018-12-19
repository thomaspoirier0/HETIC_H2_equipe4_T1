<?php

try {
    $db = new PDO('mysql:host=545f2.myd.infomaniak.com; dbname=545f2_dev_storea', '545f2_dev_storea', 'dev_storea_1234');
} catch (Exception $e) {
    echo "Exception occured :".$e->getMessage();
}
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);