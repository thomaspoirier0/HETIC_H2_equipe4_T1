<?php

class StorySender {
    protected $_ip;
    protected $_randomIndex;
    protected $_isValidIndex;
    protected $_db;
    protected $_i;

    public function __construct($db) {
        $this->setDb($db);
        $this->hydrate();
        $this->countMessages();
    }

    public function hydrate() {
        $this->_ip = Validator::getIp();
        $this->_randomIndex = 0;
        $this->_isValidIndex = false;
        $this->_i = 0;
    }

    public function setDb($db) {
        $this->_db = $db;
    }

    public function getIndexValidity() {
        return $this->_isValidIndex;
    }

    public function countMessages() {
        $data = $this->_db->query('SELECT messages FROM messages_storea');

        while($message = $data->fetch()) {
            $this->_i++;
        }
    }

    public function chooseId() {
        $this->_randomIndex = rand(1, $this->_i - 1);
        $this->testId();
    }

    function testId() {
        // fetches the list of IP who already saw the selected message
        $req = $this->_db->prepare('SELECT ip, id_message FROM ips_per_message WHERE id_message=:randomId');
        
        $req->execute(array(
            'randomId' => $this->_randomIndex
        ));
        while ($message = $req->fetch()) {
            if ($message['ip'] == $this->_ip) {
                return false;
            }
        }
        $this->_isValidIndex = true;
    }

    public function getMessage()
    {
        // get the text and the author of the selected message
        $req = $this->_db->prepare('SELECT author, messages FROM messages_storea WHERE id=:randomId');

        $req->execute(array(
            'randomId' => $this->_randomIndex
        ));

        return $req->fetch();
    }

    public function addToRead()
    {
        // if not already read, add it to my read list
        try {
            $pushIp = $this->_db->prepare('INSERT INTO ips_per_message(id_message, ip) VALUES (:id, :ip)');

            $pushIp->execute(array(
                'id' => $this->_randomIndex,
                'ip' => $this->_ip
            ));

        } catch (Exception $e) {
            die('Error :'.$e->getMessage());
        }
    }
}


// $ip = Validator::getIp();
// $randomIndex = 0;
// $isValidIndex = false;

// $data = $db->query('SELECT messages FROM messages_storea');

// $i = 0;
// while($message = $data->fetch()) {
//     $i++;
// }

    // $tableSize = $db->query('SELECT 
    //     table_name AS `Table`, 
    //     round(((data_length + index_length) / 1024 / 1024), 2) `Size in MB` 
    // FROM information_schema.TABLES 
    // WHERE table_schema = "545f2_dev_storea"
    //     AND table_name = "messages_storea";');

    // echo $tableSize->fetch();

// function chooseId($i, $db) {
//     $randomIndex = rand(1, $i - 1);
//     testId($db);
// }

// function testId($db) {
//     // fetches the list of IP who already saw the selected message
//     $req = $db->prepare('SELECT ip, id_message FROM ip_per_message WHERE id_message=:randomId');
    
//     $req->execute(array(
//         'randomId' => $randomIndex
//     ));
//     while ($message = $req->fetch()) {
//         if ($message['ip'] == $ip) {
//             return false;
//         }
//     }
//     $isValidIndex = true;
// }

// while (!$isValidIndex) {
//     chooseId($i, $db);
// }
    
// // get the text and the author of the selected message
// $req = $db->prepare('SELECT author, messages FROM messages_storea WHERE id=:randomId');

// $req->execute(array(
//     'randomId' => $randomIndex
// ));

// // if not already read, add it to my read list
// try {
//     $pushIp = $db->prepare('INSERT INTO ips_per_message(id_message, messages, ip) VALUES (:id, :ip)');

//     $pushIp->execute(array(
//         'id' => $randomIndex,
//         'ip' => $ip
//     ));

// } catch (Exception $e) {
//     die('Error :'.$e->getMessage());
// }

// // gets the message from the result of the query
// $resArray = $req->fetch();

$storySender = new StorySender($db);

while (!$storySender->getIndexValidity()) {
    $storySender->chooseId();
}

$resArray = $storySender->getMessage();

$storySender->addToRead();

$mood = Validator::getMood(json_encode(array('text' => $resArray['messages'])));

$response = [
    'author' => $resArray['author'], 
    'message' => $resArray['messages'],
    'mood' => $mood
];


echo json_encode($response);
// header('Content-Type: application/json');