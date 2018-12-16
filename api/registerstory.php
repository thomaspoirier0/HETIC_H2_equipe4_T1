<?php

$data = json_decode( file_get_contents( 'php://input' ), true );

// echo $data['user_story'];

$author = Validator::check($data['user_name']);
$story = Validator::check($data['user_story']);

// echo $story;

$req = $db->prepare('INSERT INTO messages_storea(author, messages) VALUES (:author, :story)');

$req->execute(array(
    'author' => $author,
    'story' => $story
));

echo 'OK';