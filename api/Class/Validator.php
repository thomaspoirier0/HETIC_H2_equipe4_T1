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

    public static function moderate($field) {
        echo 'lol';
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

        // if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
        // {
        //   $ip=$_SERVER['HTTP_CLIENT_IP'];
        // }
        // elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
        // {
        //   $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        // }
        // else
        // {
        //   $ip=$_SERVER['REMOTE_ADDR'];
        // }
        // return $ip;
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