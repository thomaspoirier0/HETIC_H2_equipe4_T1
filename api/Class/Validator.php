<?php

class Validator {

    public static function check($field) {
        if(!empty($field)) {
            return htmlspecialchars($field);
        } else {
            return false;
        }
    }

    public static function moderate($field) {
        echo 'lol';
    }

    public static function isJson($string) {
     json_decode($string);
     return (json_last_error() == JSON_ERROR_NONE);
    }
    
    public static function getMood($curl_post_data) {
        // if (self::isJson(!$curl_post_data)) {
        //     return 'error : the string passed is not a valid JSON string';
        // }
        $curl = curl_init();      
        curl_setopt($curl, CURLOPT_URL, "https://gateway-lon.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_USERPWD, "apikey:Oax-TXgq6DJoFwS7-Wv3fFmkhQ1wz0VX9zBG9hxkyxTK");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "content-type: application/json"
        ));
        // $result = curl_exec($curl);

        // $opts = [
        //     CURLOPT_URL => '',
        //     CURLOPT_RETURNTRANSFER => true,
        // ];

        // curl_setopt_array($curl, $opts);

        $response = json_decode(curl_exec($curl), true);

        curl_close($curl);

        return $response;
    }
}