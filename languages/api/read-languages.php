<?php
$dir = '../pending';
$files = scandir($dir);

//print_r($files);
print '{ "languages": [ ';
$languages = '';
foreach ($files as $lang) {
    if (!strpos($lang, '.') >= 1 && $lang != "." && $lang != ".." && strpos($lang, '_', 0) < 1) {
        $languages .= '{"name":"' . $lang . '"}, ';
//        print $lang;
    }
}
$languages = substr($languages, 0, -2);
print $languages;
print']}';



