<?php

$data = $db->query('SELECT messages FROM messages_storea');

$i = 0;
while($message = $data->fetch()) {
    $i++;
}

// $tableSize = $db->query('SELECT 
//     table_name AS `Table`, 
//     round(((data_length + index_length) / 1024 / 1024), 2) `Size in MB` 
// FROM information_schema.TABLES 
// WHERE table_schema = "545f2_dev_storea"
//     AND table_name = "messages_storea";');

// echo $tableSize->fetch();

$randomIndex = rand(1, $i - 1);

$req = $db->prepare('SELECT author, messages FROM messages_storea WHERE id=:randomId');

$req->execute(array(
    'randomId' => $randomIndex
));

// gets the message from the result of the query
$resArray = $req->fetch();

$mood = Validator::getMood(json_encode(array('text' => $resArray['messages'])));

$response = [
    'author' => $resArray['author'], 
    'message' => $resArray['messages'],
    'mood' => $mood
];


echo json_encode($response);