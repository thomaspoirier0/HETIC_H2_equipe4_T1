<?php

$data = json_decode( file_get_contents( 'php://input' ), true );

$author = Validator::check($data['user_name']);
$story = Validator::check($data['user_story']);
$ip = Validator::getIp();
$lastInsertId = 0;

// experimental
$mood = json_decode(Validator::getMood($story), true);
$moodArray = json_encode($mood['document_tone']['tones']);

if (empty($moodArray)) {
    $moodArray = '[{"tone_id" : "neutral"}]';
}

if ($author && $story) {

    if (Validator::isLongEnough($data['user_story'])) {
            
        try {
            $req = $db->prepare('INSERT INTO messages_storea(author, messages, moods) VALUES (:author, :story, :moods)');
        
            $req->execute(array(
                'author' => $author,
                'story' => $story,
                'moods' => $moodArray
            ));

            $lastInsertId = $db->lastInsertId();
    
        } catch (Exception $e) {
            http_response_code(500);
            echo 'Error 500 : internal server error';
            die('Error :'.$e->getMessage());
        }

        try {
            $req2 = $db->prepare('INSERT INTO ips_per_message(id_message, ip) VALUES (:id_message, :ip)');
        
            $req2->execute(array(
                'id_message' => $lastInsertId,
                'ip' => $ip
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