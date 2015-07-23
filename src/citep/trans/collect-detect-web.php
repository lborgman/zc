<?php
$transDir = "c:/Users/Lennart/Documents/GitHub/zotero/translators";

// Fix-me: changed some file names with utf8 chars for this to work on windows.
$transDir = "c:/Users/Lennart/Dropbox/Public/it/zotero-connectors/src/zotero/translators";
$transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotero-connectors/src/zotero/translators/";
// New versions where "for each" should be fixed
$transDir = "C:/Users/Lennart/Dropbox/Public/it/zotrans/git/translators";
$transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotrans/git/translators/"; 

function getDirFileNames($dir, $fileRe) {
        $names = [];
        foreach (new DirectoryIterator($dir) as $file) {
                if ($file->isFile()) {
                        $name = $file->getFilename();
                        $ok = (!$fileRe) || preg_match($fileRe, $name);
                        if ($ok) {
                                // print $name . "\n";
                                array_push($names, $name);
                        }
                }
        }
        return $names;
}
$files = getDirFileNames($transDir, "/.*\.js$/");
// var_dump($files);
// $files = "hej";
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1" >
    <title>Collect detectWeb php</title>

    <script>
      var files = ["<?php echo implode('", "', $files); ?>"];
      // console.log("files", files);
    </script>
    <script src="https://dl.dropboxusercontent.com/u/848981/it/js/promise-load.js""></script>
    <script src="collect-detect-web-php.js"></script>
    <!-- <script src="https://dl.dropboxusercontent.com/u/848981/it/zotero-connectors/src/zotero/translators/3news.co.nz.js"></script> -->
  </head>
  <body>
    <h1>Collect detectWeb php</h1>
    <div>
      <button id="start">Start</button>
    </div>
  </body>
</html>
