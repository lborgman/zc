<?php

// This can be used with "php -S localhost:port" to get output in the console:
$isLocalhost = true;
if (array_key_exists("REMOTE_ADDR", $_SERVER) && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
        $isLocalhost = false;
}
$debugRemote = false;
function writeStdErr($msg) {
        global $isLocalhost;
        global $debugRemote;
        if ($debugRemote && !$isLocalhost) { echo $msg; return; }
        if (!$isLocalhost) return;
        $fh = fopen('php://stderr','a'); fwrite($fh, $msg); fclose($fh);
}


ini_set('display_errors', 0); 
error_reporting(E_ALL);


$filename = "translators-idx-pre.js";
$data = file_get_contents("php://input");
// writeStdErr("data");
// writeStdErr($data);

if (!$data) {
        $ret = file_put_contents($filename, "var splittedTrans = {};\nvar transIds = {};\n\n\n");
} else {
        $ret = file_put_contents($filename, $data, FILE_APPEND);
}
writeStdErr("ret=".$ret);
echo "ret=".$ret;
?>
