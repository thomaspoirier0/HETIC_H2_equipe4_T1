<?php

class Validator {

    public static function check($field) {
        if(!empty($field)) {
            return htmlspecialchars($field);
        } else {
            return false;
        }
    }

    public static function isLongEnough($field) {
        if(strlen($field) >= 20) {
            return true;
        } else {
            return false;
        };
    }

    public static function moderate($input) {
        $input = 'text='.urlencode($input);
        $curl = curl_init();      
        curl_setopt($curl, CURLOPT_URL, "http://api1.webpurify.com/services/rest/?method=webpurify.live.replace&api_key=331d24ff7b559264b72c0aeca03560ee&format=json&replacesymbol=*&lang=fr");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $input);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }

    public static function isJson($string) {
     json_decode($string);
     return (json_last_error() == JSON_ERROR_NONE);
    }

    public static function getIp() {
        // check for shared internet/ISP IP
        if (!empty($_SERVER['HTTP_CLIENT_IP']) && self::validate_ip($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }

        // check for IPs passing through proxies
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // check if multiple ips exist in var
            if (strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ',') !== false) {
                $iplist = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                foreach ($iplist as $ip) {
                    if (self::validate_ip($ip))
                        return $ip;
                }
            } else {
                if (self::validate_ip($_SERVER['HTTP_X_FORWARDED_FOR']))
                    return $_SERVER['HTTP_X_FORWARDED_FOR'];
            }
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED']) && self::validate_ip($_SERVER['HTTP_X_FORWARDED']))
            return $_SERVER['HTTP_X_FORWARDED'];
        if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && self::validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
            return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
        if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && self::validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
            return $_SERVER['HTTP_FORWARDED_FOR'];
        if (!empty($_SERVER['HTTP_FORWARDED']) && self::validate_ip($_SERVER['HTTP_FORWARDED']))
            return $_SERVER['HTTP_FORWARDED'];

        // return unreliable ip since all else failed
        return $_SERVER['REMOTE_ADDR'];
    }

    public static function validate_ip($ip) {
        if (strtolower($ip) === 'unknown')
            return false;
    
        // generate ipv4 network address
        $ip = ip2long($ip);
    
        // if the ip is set and not equivalent to 255.255.255.255
        if ($ip !== false && $ip !== -1) {
            // make sure to get unsigned long representation of ip
            // due to discrepancies between 32 and 64 bit OSes and
            // signed numbers (ints default to signed in PHP)
            $ip = sprintf('%u', $ip);
            // do private network range checking
            if ($ip >= 0 && $ip <= 50331647) return false;
            if ($ip >= 167772160 && $ip <= 184549375) return false;
            if ($ip >= 2130706432 && $ip <= 2147483647) return false;
            if ($ip >= 2851995648 && $ip <= 2852061183) return false;
            if ($ip >= 2886729728 && $ip <= 2887778303) return false;
            if ($ip >= 3221225984 && $ip <= 3221226239) return false;
            if ($ip >= 3232235520 && $ip <= 3232301055) return false;
            if ($ip >= 4294967040) return false;
        }
        return true;
    }
    
    public static function getMood($curl_post_data) {
        $toBeTranslated = $curl_post_data;

        $curl_post_data = self::translate($toBeTranslated);
        
        $curl_post_data = json_encode(array('text' => $curl_post_data));

        $curl = curl_init();      
        curl_setopt($curl, CURLOPT_URL, "https://gateway-lon.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_USERPWD, "apikey:Oax-TXgq6DJoFwS7-Wv3fFmkhQ1wz0VX9zBG9hxkyxTK");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "content-type: application/json"
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }

    public static function translate($input) {

        try {
            $input = 'text='.urlencode($input);
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181217T170242Z.e67b92d556ab71d4.9225794281ff6d407d26baedb339152f7784327f&lang=en");
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $input);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    
            $response = curl_exec($curl);
                            
            if ($response === false) {
                throw new Exception(curl_error($curl), curl_errno($curl));
            }
            curl_close($curl);

            $response = json_decode($response, true);
            
            $response = $response['text'][0];
            
            return $response;

        } catch(Exception $e) {
            trigger_error(sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(), $e->getMessage()),
                E_USER_ERROR);
            die('Error :'.$e->getCode().' '.$e->getMessage());
        }
    }
}