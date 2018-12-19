<?php

class StorySender {
    protected $_ip;
    protected $_randomIndex;
    protected $_isValidIndex;
    protected $_db;
    protected $_i;
    protected $_maxTry;

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
        $this->_maxTry = 0;
    }

    public function setDb($db) {
        $this->_db = $db;
    }

    public function getTry() {
        $this->_maxTry++;
    }

    public function incTry() {
        $this->_maxTry++;
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
        $this->_randomIndex = rand(1, $this->_i);
        
        // change for prod
        $this->testId();
    }

    function testId() {

        if ($this->_maxTry < 15) {
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
        } else {
            $this->_isValidIndex = true;
        }
    }

    public function getMessage()
    {
        if ($this->_maxTry < 15) {
            // get the text and the author of the selected message
            $req = $this->_db->prepare('SELECT author, messages, moods FROM messages_storea WHERE id=:randomId');
    
            $req->execute(array(
                'randomId' => $this->_randomIndex
            ));
    
            return $req->fetch();
        } else {
            $default = array(
                'author' => 'The team',
                'messages' => 'Vous avez lu tous les messages que nous avions pour vous... Maintenant, c\' est à votre tour!',
                'moods' => '[{"score" : 1, "tone_id" : "joy"}]'
            );
            return $default;
        }
        

    }

    public function addToRead()
    {
        if ($this->_maxTry < 15) {
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

    public function computeReadTime($story)
    {
        // 10 chars per second-read time base
        $readTime = 0;

        $textFactor = strlen($story) * 0.06;

        return $readTime + $textFactor;
    }
}

$storySender = new StorySender($db);

while (!$storySender->getIndexValidity()) {
    $storySender->chooseId();
    $storySender->incTry();
}

$resArray = $storySender->getMessage();

$readTime = $storySender->computeReadTime($resArray['messages']);

// change for tests
$storySender->addToRead();

// experimental
$moderatedMessage = json_decode(Validator::moderate($resArray['messages']), true);
$moderatedPseudo = json_decode(Validator::moderate($resArray['author']), true);

$moodArray = json_decode($resArray['moods'], true);

$response = [
    'author' => $moderatedPseudo['rsp']['text'], 
    'message' => $moderatedMessage['rsp']['text'],
    'mood' => $moodArray,
    'readtime' => $readTime
];


header('Content-Type: application/json');
echo json_encode($response);