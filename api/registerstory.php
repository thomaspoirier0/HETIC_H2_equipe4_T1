<?php

$data = json_decode( file_get_contents( 'php://input' ), true );

// echo $data['user_story'];

$author = Validator::check($data['user_name']);
$story = Validator::check($data['user_story']);

// echo $story;

if ($author && $story) {

    if (Validator::isLongEnough($data['user_story'])) {
            
        try {
            $req = $db->prepare('INSERT INTO messages_storea(author, messages) VALUES (:author, :story)');
        
            $req->execute(array(
                'author' => $author,
                'story' => $story
            ));
    
        } catch (Exception $e) {
            http_response_code(500);
            echo 'Error 500 : internal server error';
            die('Error :'.$e->getMessage());
        }
    
        echo 'OK';

    } else {

        echo 'Error : the text you submitted were too short';
        http_response_code(400);

    }


} else {
    echo 'Error : the informations you submitted were not formatted correctly';
    http_response_code(400);
    die();
}